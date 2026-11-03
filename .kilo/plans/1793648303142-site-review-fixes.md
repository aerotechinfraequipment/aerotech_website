# Site review fixes

## Goal
Fix performance, dead assets, security headers, and SEO on the existing Vite + React SPA without a redesign, framework migration, or invented prices.

## Constraints
- Keep routes, copy, and visual design.
- Do not add Bootstrap. README claims it; `package.json` does not use it.
- Do not emit `Offer.price` of `0.00`. There is no price data.
- Do not delete an image or file unless a repo-wide search shows zero references.
- Vercel serves real files before `vercel.json` rewrites. Use that.

## Findings to fix

### Performance
- Home imports `FeaturedEquipment`, which imports `src/data/equipment/list.ts`. That module statically imports the full equipment image set (`src/assets/images`, 8.6MB). Home only needs `can_show_in_home` items.
- `src/styles/main.scss` imports every page stylesheet, so `cssCodeSplit` does nothing.
- `src/index.css` loads Manrope with a render-blocking CSS `@import` (weights 400–800). `index.html` preconnects to Google Fonts but never loads the stylesheet there.
- Hero (`src/assets/hero_bg.mp4`, 2.0MB) autoplays with no poster, no `preload="metadata"`, and no `prefers-reduced-motion` fallback. No image has `width`/`height` (CLS).
- `public/data/products-list.json` duplicates `src/data/products/products-list.json` and is never fetched.

### SEO
- Head tags are updated only in `useEffect` (`src/components/seo/SEO.tsx`). First HTML for every URL is the homepage shell in `index.html`. Social crawlers and non-JS bots never see route titles, canonicals, or product copy.
- Unknown routes, missing products, and missing equipment `Navigate` to a 200 page. Combined with the catch-all rewrite, that is a soft 404.
- Canonical falls back to `window.location.href`, so query strings become canonicals.
- `ogType="product"` is not a valid Open Graph type.
- Product and equipment JSON-LD sets `"price": "0.00"`. That can disqualify or penalize rich results.
- `schema` objects are new every render and are effect dependencies, so head tags are rewritten constantly.
- `theme-color` is `#11151c` in `index.html` and `#f59e0b` in `public/site.webmanifest`.
- Default share image is a 512px logo, not a 1200×630 image.

### Security
- CSP allows `'unsafe-inline'` scripts. JSON-LD is inline in `index.html` and injected by `SEO.tsx`.
- HSTS includes `preload` without evidence every subdomain is HTTPS. Keep HSTS; drop only the `preload` token.
- Product slug sanitization strips characters (`foo/../bar` can collapse into another filename) instead of rejecting the slug.
- `connect-src` lists `https://wa.me`, but forms use `window.open`, not `fetch`.
- Forms put name, phone, and email in the WhatsApp URL. That is intentional delivery, not a secret leak. Do not log those values. The comment in `ContactForm.tsx` that says PII is not in the URL is false.

### Dead code confirmed unused
- `src/assets/logo/logo-yellow.png`
- `public/favicon.png`
- `public/icons.svg`
- `public/favicon-48x48.png` (not linked from `index.html` or the manifest)
- `public/data/products-list.json`
- `getProductDetail()` in `src/data/products/index.ts` (page fetches JSON itself)
- Commented nav items in `src/components/layout/Header.tsx`

Do not delete product, steel, industry, or equipment images. They are referenced.

## Implementation

1. **Prerender known routes and stop soft 404s**
   - Build a route manifest from `equipments` ids and `productsCatalog` slugs plus `/`, `/equipment`, `/products`, `/steel-products`, `/about`, `/contact`.
   - At build, emit `dist/<route>/index.html` for each route with the correct `<title>`, description, canonical, robots, Open Graph, Twitter tags, and JSON-LD already in `<head>`.
   - Put a short crawlable summary in the body (name, description, primary links). React may replace it after hydration.
   - Add `dist/404.html` with `noindex` and a real not-found page. Remove the catch-all rewrite in `vercel.json` so unknown URLs 404. Client-side navigation stays on React Router.
   - Replace `Navigate` fallbacks in `App.tsx`, `ProductDetail.tsx`, and `EquipmentDetail.tsx` with a `NotFound` page that sets `noindex`. Do not redirect missing URLs to `/`.
   - If a Vite 8 prerender plugin fails to install or build, use a small Node post-build script that copies `dist/index.html` and injects head/body per route. Do not migrate to Next.js.

2. **Fix `SEO.tsx`**
   - Canonical must be `BASE_URL + route path` only. Never use `window.location.href`. Filtered product URLs canonical to `/products` unless a dedicated prerendered category URL exists. Do not prerender filter query strings.
   - Force `og:type` to `website`. Keep Product/Service data in JSON-LD only.
   - Update `og:url`, `twitter:url`, and `og:image:alt` with the page values.
   - Depend on a stable serialized schema string, not object identity.
   - Remove keyword meta updates. Google ignores them.
   - Align `theme-color` to `#11151c` in the manifest, or the other way around if the amber bar is intentional. Use one value in both files.

3. **Correct structured data**
   - Products: `Product` with name, description, image, brand, category. Omit `Offer` until a real price exists. Keep `availability` only if it can live without a fake price; otherwise drop the offer block.
   - Equipment: use `Service` (rental), not `Product` with price `0.00`. Include name, description, area served (`Tamil Nadu`), provider, and URL.
   - One `LocalBusiness` source. Do not emit a second copy from `Home.tsx` when `index.html` already has it. Other pages should not delete that static block.
   - Escape JSON-LD with `JSON.stringify` assigned to `script.text` (already done). Do not use `innerHTML`.
   - Add one 1200×630 share image under `public/` and point default `og:image` at it. Do not use the 512 favicon as the large-card image.

4. **Cut the home payload**
   - Split featured equipment into its own module that imports only `can_show_in_home` images. `EquipmentRental` and `EquipmentDetail` keep the full list.
   - Home product strip should import four featured records, not the whole catalog, if that does not require a data rewrite larger than a filtered export.
   - Move page SCSS imports from `main.scss` onto the page components that use them. Leave header, footer, and shared tokens global.
   - Replace the font `@import` with a `<link>` in `index.html` using `display=swap`. Load only weights that styles actually use. Keep the existing preconnect.
   - Hero: add a poster still, `preload="metadata"`, and pause/hide the video under `prefers-reduced-motion`. Do not remove the video.
   - Add explicit `width` and `height` (or aspect-ratio) on logo, cards, and detail images. Keep `loading="lazy"` off the hero/logo; set `fetchpriority="high"` on the LCP image/poster only.
   - Extend `vercel.json` cache headers to hashed `/assets/*` (already present) and to `/images/*` with a long max-age. Do not mark HTML immutable.

5. **Security headers and input checks**
   - Move homepage JSON-LD to an external `/schema/local-business.json` referenced by script `src`, or hash the inline script. Then set `script-src 'self'` and remove `'unsafe-inline'` from scripts. Keep `style-src 'unsafe-inline'` until inline styles are gone.
   - Add `upgrade-insecure-requests` and `frame-ancestors 'self'`. Keep Google Maps and `https://wa.me` frame/navigation allowances. Set `form-action 'self' https://wa.me`.
   - Set `Cross-Origin-Opener-Policy` to `same-origin-allow-popups` so WhatsApp `window.open` still works.
   - Remove `preload` from HSTS. Leave `max-age` and `includeSubDomains`.
   - In `ProductDetail`, accept only `^[a-z0-9-]+$`. Otherwise render `NotFound`. Use the same helper in `getProductDetail` if it remains.
   - Narrow `img-src` to `'self' data: blob:` unless a live external image host is referenced.
   - Run `npm audit`. Fix high/critical issues that do not require a breaking upgrade. Do not commit lockfile noise unrelated to that.

6. **Remove confirmed dead files and code**
   - Delete the unused files listed above.
   - Delete `getProductDetail` only if nothing imports it after the slug helper move. Otherwise make `ProductDetail` call it so fetch logic exists once.
   - Remove commented Header links.
   - Remove production `console.error` / `console.warn` or gate them behind `import.meta.env.DEV`.
   - Grep SCSS class names that appear in no TSX/HTML. Delete only selectors with zero matches. Do not delete shared utilities (`container`, `btn`, `quote-form`) on a partial match.
   - Correct `README.md` so it no longer says Bootstrap or omits equipment, steel, and contact routes.

7. **Small quality fixes in touched files**
   - Hamburger `aria-label` and `aria-expanded` must match open state.
   - Add a skip link to main content in `MainLayout`.
   - Keep form validation and `rel="noopener noreferrer"` on external links.

## Out of scope
- New prices, checkout, or a backend for forms.
- Renaming equipment files that contain spaces or colons.
- Converting every public product JPG to WebP if that changes URLs stored in product JSON.
- A visual redesign or comment-only cleanup outside files already being edited.

## Validation
- `npm run lint`
- `npm run build`
- Confirm `dist/products/<known-slug>/index.html` contains that product’s `<title>` and canonical before JS runs.
- Confirm `dist/equipment/<known-id>/index.html` has no `"price":"0.00"`.
- Open `/`, `/products`, one product, one equipment page, and a fake URL. Fake URL must be the 404 page, not home.
- Confirm home network waterfall does not download the full equipment image set.
- Confirm WhatsApp quote and contact buttons still open `wa.me` and maps still load on Contact.
