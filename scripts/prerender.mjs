import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const BASE_URL = "https://aerotechinfraequipment.com";
const SHARE_IMAGE = `${BASE_URL}/og-image.png`;
const SHARE_ALT = "AeroTech share image with a yellow boom lift";
const ORG_ID = `${BASE_URL}/#organization`;

const PRIMARY_LINKS = [
  ["/", "Home"],
  ["/equipment", "Equipment rental"],
  ["/products", "Industrial products"],
  ["/steel-products", "Steel products"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function jsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function formatTitle(title) {
  if (!title) return "Construction Equipment Rental & Sales | AeroTech Infra Equipment";
  return title.includes("AeroTech") ? title : `${title} | AeroTech Infra Equipment`;
}

function clip(text, max = 155) {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  const trimmed = (space > 40 ? cut.slice(0, space) : cut).replace(/[.,;:]+$/, "");
  return `${trimmed}…`;
}

function absolute(path) {
  if (!path) return SHARE_IMAGE;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function loadLocalEnv() {
  const files = [join(ROOT, ".env.local"), join(ROOT, ".env"), join(ROOT, "..", ".env")];
  for (const path of files) {
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      if (!/^[A-Z0-9_]+$/.test(key) || process.env[key]) continue;
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
  if (!process.env.VITE_SUPABASE_URL && process.env.SUPABASE_URL) {
    process.env.VITE_SUPABASE_URL = process.env.SUPABASE_URL;
  }
  if (!process.env.VITE_SUPABASE_ANON_KEY && process.env.SUPABASE_ANON_KEY) {
    process.env.VITE_SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  }
}

async function rest(path) {
  const base = process.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!base || !key) throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
  const response = await fetch(`${base}/rest/v1/${path}`, {
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      accept: "application/json",
    },
  });
  if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error("Catalog response was not a list");
  return data;
}

function breadcrumb(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

function pageSchema(type, name, description, path, extra = {}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        name,
        description,
        url: `${BASE_URL}${path}`,
        ...extra,
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name, path },
      ]),
    ],
  };
}

function setTitle(html, title) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="title"\s+content=")[^"]*(")/, `$1${esc(title)}$2`);
}

function setMeta(html, attr, key, content) {
  const tag = `<meta ${attr}="${key}" content="${esc(content)}" />`;
  const re = new RegExp(`<meta\\s+${attr}="${key}"[^>]*>`, "i");
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function removeMeta(html, attr, key) {
  return html.replace(new RegExp(`\\s*<meta\\s+${attr}="${key}"[^>]*>`, "gi"), "");
}

function setCanonical(html, href) {
  const tag = `<link rel="canonical" href="${esc(href)}" />`;
  if (/<link\s+rel="canonical"/i.test(html)) {
    return html.replace(/<link\s+rel="canonical"[^>]*>/i, tag);
  }
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function removeCanonical(html) {
  return html.replace(/\s*<link\s+rel="canonical"[^>]*>/i, "");
}

function injectSchema(html, schema) {
  const without = html.replace(/\s*<script[^>]*id="route-schema"[^>]*>[\s\S]*?<\/script>/i, "");
  if (!schema) return without;
  const tag = `<script type="application/ld+json" id="route-schema">${jsonLd(schema)}</script>`;
  return without.replace("</head>", `    ${tag}\n  </head>`);
}

function summaryHtml(heading, text, links, articleClass) {
  const nav = links
    .map(([href, label]) => `<a href="${esc(href)}">${esc(label)}</a>`)
    .join(" ");
  const className = articleClass || "prerender-summary";
  return `<div id="root"><main id="main-content"><article class="${className}"><h1>${esc(heading)}</h1><p>${esc(text)}</p><nav aria-label="Helpful links">${nav}</nav></article></main></div>`;
}

function writeSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const meta = {
    "/": ["daily", "1.0"],
    "/equipment": ["weekly", "0.9"],
    "/products": ["weekly", "0.9"],
    "/steel-products": ["weekly", "0.8"],
    "/about": ["monthly", "0.7"],
    "/contact": ["monthly", "0.8"],
  };
  const urls = routes
    .map((route) => {
      const [freq, priority] = meta[route.path] || ["weekly", "0.8"];
      const loc = route.path === "/" ? `${BASE_URL}/` : `${BASE_URL}${route.path}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  if (xml.includes("https://aerotechinfra.com/")) {
    throw new Error("Sitemap still contains the non-resolving domain");
  }
  writeFileSync(join(DIST, "sitemap.xml"), xml);
  writeFileSync(join(ROOT, "public", "sitemap.xml"), xml);
}

function render(template, route) {
  let html = setTitle(template, route.title);
  html = setMeta(html, "name", "description", route.description);
  html = setMeta(html, "name", "robots", route.robots);
  html = removeMeta(html, "name", "keywords");
  html = route.canonical ? setCanonical(html, route.canonical) : removeCanonical(html);
  html = setMeta(html, "property", "og:type", "website");
  html = setMeta(html, "property", "og:title", route.title);
  html = setMeta(html, "property", "og:description", route.description);
  html = route.canonical
    ? setMeta(html, "property", "og:url", route.canonical)
    : removeMeta(html, "property", "og:url");
  html = setMeta(html, "property", "og:image", route.image);
  html = setMeta(html, "property", "og:image:alt", route.imageAlt);
  if (route.image === SHARE_IMAGE) {
    html = setMeta(html, "property", "og:image:width", "1200");
    html = setMeta(html, "property", "og:image:height", "630");
  } else {
    html = removeMeta(html, "property", "og:image:width");
    html = removeMeta(html, "property", "og:image:height");
  }
  html = setMeta(html, "name", "twitter:title", route.title);
  html = setMeta(html, "name", "twitter:description", route.description);
  html = route.canonical
    ? setMeta(html, "name", "twitter:url", route.canonical)
    : removeMeta(html, "name", "twitter:url");
  html = setMeta(html, "name", "twitter:image", route.image);
  html = injectSchema(html, route.schema);
  const body = summaryHtml(route.heading, route.description, route.links, route.articleClass);
  if (!/<div id="root">\s*<\/div>/.test(html)) {
    throw new Error("Built index.html is missing <div id=\"root\"></div>");
  }
  return html.replace(/<div id="root">\s*<\/div>/, body);
}

function writeRoute(routePath, html) {
  const file = routePath === "/" ? join(DIST, "index.html") : join(DIST, routePath.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function staticRoute(path, title, description, schemaType, heading) {
  const formatted = formatTitle(title);
  const pageName = heading || title.replace(/\s*\|.*$/, "");
  return {
    path,
    title: formatted,
    heading: pageName,
    description,
    canonical: `${BASE_URL}${path}`,
    robots: "index, follow, max-image-preview:large",
    image: SHARE_IMAGE,
    imageAlt: SHARE_ALT,
    schema: pageSchema(schemaType, pageName, description, path),
    links: PRIMARY_LINKS,
  };
}

async function main() {
loadLocalEnv();
const template = readFileSync(join(DIST, "index.html"), "utf8");
const equipmentRows = await rest(
  "equipment?select=id,name,brand,category_label,description,image_url&archived_at=is.null&order=sort_order",
);
const productRows = await rest(
  "products?select=slug,name,brand,category,short_description,overview,thumbnail,images&archived_at=is.null&order=name.asc",
);
const equipments = equipmentRows.map((item) => ({
  id: item.id,
  name: item.name,
  brand: item.brand,
  category: item.category_label || "",
  description: item.description || "",
  image: item.image_url || "",
}));
const catalogProducts = productRows.map((item) => ({
  slug: item.slug,
  name: item.name,
  brand: item.brand,
  category: item.category,
  shortDescription: item.short_description || "",
  overview: item.overview || "",
  image: item.thumbnail || (Array.isArray(item.images) ? item.images[0] : "") || "",
}));

if (equipments.length < 10) {
  throw new Error(`Equipment fetch failed (${equipments.length} items)`);
}
if (catalogProducts.length < 10) {
  throw new Error(`Product fetch failed (${catalogProducts.length} items)`);
}

const routes = [
  staticRoute(
    "/",
    "Construction Equipment Rental & Sales",
    "Reliable construction equipment rental and product sales in Tamil Nadu. Hire boom lifts and cranes, or buy tools, steel, and hardware in Sriperumbudur.",
    "WebSite",
    "Construction Equipment & Infrastructure Solutions",
  ),
  staticRoute(
    "/equipment",
    "Boom Lifts, Cranes & Excavator Rental",
    "Hire Genie and JLG boom lifts, rough-terrain scissor lifts, SANY excavators, and all-terrain cranes by the day or month from Sriperumbudur.",
    "CollectionPage",
    "Construction Equipment Rental",
  ),
  staticRoute(
    "/products",
    "Industrial Products, Power Tools & Safety Gear",
    "Buy Bosch, ESAB, Taparia, Stanley, and 3M hardware in Chennai and Sriperumbudur. Power tools, welding gear, fasteners, paints, and PPE with GST invoices.",
    "CollectionPage",
    "Industrial Products & Hardware",
  ),
  staticRoute(
    "/steel-products",
    "Structural Steel, Pipes, Roofing & Mesh",
    "Order square pipes, round pipes, channels, I-beams, angles, roofing sheets, and chain-link mesh for fabrication and site work across Tamil Nadu.",
    "CollectionPage",
    "Steel Products, Roofing & Mesh",
  ),
  staticRoute(
    "/about",
    "About Our Sriperumbudur Equipment Yard",
    "AeroTech Infra Equipment Private Limited rents heavy machinery and sells genuine industrial supplies from Sriperumbudur to contractors across Tamil Nadu.",
    "AboutPage",
    "About AeroTech Infra Equipment",
  ),
  staticRoute(
    "/contact",
    "Request a Rental Quote in Sriperumbudur",
    "Call +91 97918 90636 or send an enquiry for equipment hire and industrial supply quotes. Visit the office on Chennai Salai, Sriperumbudur.",
    "ContactPage",
    "Contact AeroTech in Sriperumbudur",
  ),
];

routes[0].schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: `${BASE_URL}/`,
  name: "AeroTech Infra Equipment",
  description: "Reliable construction equipment rental and product sales in Tamil Nadu. Hire boom lifts and cranes, or buy tools, steel, and hardware in Sriperumbudur.",
  publisher: { "@id": ORG_ID },
};

for (const item of equipments) {
  const path = `/equipment/${item.id}`;
  const title = formatTitle(`${item.name} Rental (${item.brand}) | Daily & Monthly Hire`);
  const description = clip(`Hire the ${item.brand} ${item.name} in Sriperumbudur and Chennai. ${item.description}`);
  const imagePath = item.image || "";
  const image = imagePath ? absolute(imagePath) : SHARE_IMAGE;
  routes.push({
    path,
    title,
    heading: item.name,
    description,
    canonical: `${BASE_URL}${path}`,
    robots: "index, follow, max-image-preview:large",
    image,
    imageAlt: `${item.brand} ${item.name}`,
    links: [
      ["/", "Home"],
      ["/equipment", "Equipment rental"],
      [path, item.name],
    ],
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `${BASE_URL}${path}#service`,
          name: item.name,
          description: item.description,
          serviceType: item.category,
          url: `${BASE_URL}${path}`,
          ...(imagePath ? { image } : {}),
          areaServed: { "@type": "AdministrativeArea", name: "Tamil Nadu" },
          provider: { "@id": ORG_ID },
        },
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Equipment Rental", path: "/equipment" },
          { name: item.name, path },
        ]),
      ],
    },
  });
}

for (const product of catalogProducts) {
  const path = `/products/${product.slug}`;
  const blurb = product.shortDescription || String(product.overview || "").slice(0, 140);
  const title = formatTitle(`${product.name} (${product.brand}) | Buy in Sriperumbudur & Chennai`);
  const description = clip(`${product.brand} ${product.name}. ${blurb} Available from AeroTech in Tamil Nadu.`);
  const imagePath = product.image;
  routes.push({
    path,
    title,
    heading: product.name,
    description,
    canonical: `${BASE_URL}${path}`,
    robots: "index, follow, max-image-preview:large",
    image: absolute(imagePath),
    imageAlt: `${product.name} by ${product.brand}`,
    links: [
      ["/", "Home"],
      ["/products", "Industrial products"],
      [path, product.name],
    ],
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "@id": `${BASE_URL}${path}#product`,
          name: product.name,
          description: blurb,
          image: absolute(imagePath),
          brand: { "@type": "Brand", name: product.brand },
          category: product.category,
        },
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Industrial Products", path: "/products" },
          { name: product.name, path },
        ]),
      ],
    },
  });
}

for (const route of routes) {
  writeRoute(route.path, render(template, route));
}

const notFound = render(template, {
  title: "Page Not Found | AeroTech Infra Equipment",
  heading: "404 — Page Not Found",
  description: "That address does not match a page on the AeroTech Infra Equipment site.",
  canonical: "",
  robots: "noindex, nofollow",
  image: SHARE_IMAGE,
  imageAlt: SHARE_ALT,
  schema: null,
  links: PRIMARY_LINKS,
  articleClass: "prerender-summary not-found",
});
writeFileSync(join(DIST, "404.html"), notFound);
writeSitemap(routes);

const sampleProduct = catalogProducts[0].slug;
const sampleEquipment = equipments[0].id;
const productHtml = readFileSync(join(DIST, "products", sampleProduct, "index.html"), "utf8");
const equipmentHtml = readFileSync(join(DIST, "equipment", sampleEquipment, "index.html"), "utf8");
const expectedTitle = esc(formatTitle(`${catalogProducts[0].name} (${catalogProducts[0].brand}) | Buy in Sriperumbudur & Chennai`));
if (!productHtml.includes(`<title>${expectedTitle}</title>`)) {
  throw new Error("Product prerender title missing");
}
if (!productHtml.includes(`rel="canonical" href="${BASE_URL}/products/${sampleProduct}"`)) {
  throw new Error("Product prerender canonical missing");
}
if (equipmentHtml.includes('"price":"0.00"') || equipmentHtml.includes('"price": "0.00"')) {
  throw new Error("Equipment prerender still contains a fake price");
}

console.log(`Prerendered ${routes.length} routes and dist/404.html`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
