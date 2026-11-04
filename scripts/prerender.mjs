import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const BASE_URL = "https://aerotechinfra.com";
const SHARE_IMAGE = `${BASE_URL}/og-image.png`;
const ORG_ID = `${BASE_URL}/#organization`;

const PRIMARY_LINKS = [
  ["/", "Home"],
  ["/equipment", "Equipment rental"],
  ["/products", "Industrial products"],
  ["/steel-products", "Steel products"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

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
  if (!title) return "Construction Equipment Rental & Industrial Products | AeroTech Infra Equipment";
  return title.includes("AeroTech") ? title : `${title} | AeroTech Infra Equipment`;
}

function absolute(path) {
  if (!path) return SHARE_IMAGE;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function unescapeTs(value) {
  return value.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, " ");
}

function quoted(chunk, name) {
  const single = chunk.match(new RegExp(`${name}:\\s*'((?:\\\\'|[^'])*)'`));
  if (single) return unescapeTs(single[1]);
  const double = chunk.match(new RegExp(`${name}:\\s*"((?:\\\\"|[^"])*)"`));
  if (double) return unescapeTs(double[1]);
  return "";
}

function parseEquipments(source) {
  const imports = Object.fromEntries(
    [...source.matchAll(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g)].map((match) => [match[1], match[2]]),
  );
  const items = [];
  for (const chunk of source.split(/\n\s*\{/)) {
    const id = quoted(chunk, "id");
    if (!id) continue;
    const imageVar = chunk.match(/image:\s*(\w+)/)?.[1];
    items.push({
      id,
      name: quoted(chunk, "name") || id,
      brand: quoted(chunk, "brand"),
      category: quoted(chunk, "category_formated"),
      description: quoted(chunk, "description"),
      imageImport: imageVar ? imports[imageVar] : "",
    });
  }
  return items;
}

function loadManifest() {
  const candidates = [join(DIST, ".vite", "manifest.json"), join(DIST, "manifest.json")];
  for (const path of candidates) {
    if (existsSync(path)) return readJson(path);
  }
  return {};
}

function assetUrl(manifest, importPath) {
  if (!importPath) return "";
  const filename = importPath.split("/").pop();
  for (const [key, value] of Object.entries(manifest)) {
    const src = typeof value.src === "string" ? value.src : key;
    if (src.endsWith(filename) || key.endsWith(filename)) {
      const file = value.file || value.assets?.[0];
      if (file) return `/${String(file).replace(/^\//, "")}`;
    }
  }
  return "";
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

function summaryHtml(heading, text, links) {
  const nav = links
    .map(([href, label]) => `<a href="${esc(href)}">${esc(label)}</a>`)
    .join(" ");
  return `<div id="root"><main id="main-content"><article class="prerender-summary"><h1>${esc(heading)}</h1><p>${esc(text)}</p><nav aria-label="Primary">${nav}</nav></article></main></div>`;
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
  html = setMeta(html, "property", "og:url", route.canonical || `${BASE_URL}/`);
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
  html = setMeta(html, "name", "twitter:url", route.canonical || `${BASE_URL}/`);
  html = setMeta(html, "name", "twitter:image", route.image);
  html = injectSchema(html, route.schema);
  const body = summaryHtml(route.heading, route.description, route.links);
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

function staticRoute(path, title, description, schemaType) {
  const formatted = formatTitle(title);
  return {
    path,
    title: formatted,
    heading: title.replace(/\s*\|.*$/, ""),
    description,
    canonical: `${BASE_URL}${path}`,
    robots: "index, follow, max-image-preview:large",
    image: SHARE_IMAGE,
    imageAlt: formatted,
    schema: pageSchema(schemaType, title.replace(/\s*\|.*$/, ""), description, path),
    links: PRIMARY_LINKS,
  };
}

const catalog = readJson(join(ROOT, "src/data/products/products-list.json"));
const equipments = [
  ...parseEquipments(readFileSync(join(ROOT, "src/data/equipment/list.ts"), "utf8")),
  ...parseEquipments(readFileSync(join(ROOT, "src/data/equipment/featured.ts"), "utf8")),
].filter((item, index, all) => all.findIndex((other) => other.id === item.id) === index);
const manifest = loadManifest();
const template = readFileSync(join(DIST, "index.html"), "utf8");

if (equipments.length < 10) {
  throw new Error(`Equipment parse failed (${equipments.length} items)`);
}

const routes = [
  staticRoute(
    "/",
    "Construction Equipment Rental & Industrial Products | AeroTech Infra Equipment",
    "AeroTech Infra Equipment — boom lifts, scissor lifts, excavators, and cranes for daily or monthly rental, plus genuine pneumatics, power tools, steel, and industrial hardware in Sriperumbudur, Tamil Nadu.",
    "WebSite",
  ),
  staticRoute(
    "/equipment",
    "Construction Equipment Rental Fleet | Boom Lifts, Cranes & Scissor Lifts",
    "Browse AeroTech's heavy equipment rental fleet in Sriperumbudur & Chennai. Genie & JLG boom lifts, rough terrain scissor lifts, SANY excavators and all-terrain cranes.",
    "CollectionPage",
  ),
  staticRoute(
    "/products",
    "Industrial Products & Hardware Catalogue | Power Tools, Welding & Safety",
    "Shop genuine industrial products and hardware in Sriperumbudur & Chennai. Bosch, ESAB, Taparia, Stanley, Berger, Asian Paints, and 3M. Prompt dispatch and GST invoicing.",
    "CollectionPage",
  ),
  staticRoute(
    "/steel-products",
    "Structural Steel, Pipes, Roofing & Mesh Supply | AeroTech",
    "Source structural steel, square & round pipes, channels, I-beams, angles, roofing sheets, and chain link mesh from AeroTech in Sriperumbudur, Tamil Nadu.",
    "CollectionPage",
  ),
  staticRoute(
    "/about",
    "About Us | AeroTech Infra Equipment Sriperumbudur",
    "Learn about AeroTech Infra Equipment Private Limited. Based in Sriperumbudur, Tamil Nadu, we provide heavy equipment rental and genuine industrial supplies across South India.",
    "AboutPage",
  ),
  staticRoute(
    "/contact",
    "Contact Us & Request Equipment Rental Quote | AeroTech Sriperumbudur",
    "Contact AeroTech Infra Equipment in Sriperumbudur, Tamil Nadu. Call +91 97918 90636 or submit an enquiry for daily/monthly equipment rental or industrial supply quotes.",
    "ContactPage",
  ),
];

routes[0].schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: `${BASE_URL}/`,
  name: "AeroTech Infra Equipment",
  description: "Construction equipment rental & industrial products counter in Sriperumbudur, Tamil Nadu.",
  publisher: { "@id": ORG_ID },
};
routes[0].heading = "Industrial Equipment Solutions for Demanding Projects";

for (const item of equipments) {
  const path = `/equipment/${item.id}`;
  const title = formatTitle(`${item.name} Rental (${item.brand}) | Daily & Monthly Hire`);
  const description = `Rent ${item.brand} ${item.name} in Sriperumbudur & Chennai, Tamil Nadu. ${item.description.slice(0, 150)}... Site-ready with full technical support.`;
  const imagePath = assetUrl(manifest, item.imageImport);
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

for (const product of catalog.products) {
  const path = `/products/${product.slug}`;
  const detailPath = join(ROOT, "public/data/products", `${product.slug}.json`);
  const detail = existsSync(detailPath) ? readJson(detailPath) : product;
  const blurb = detail.shortDescription || String(detail.overview || "").slice(0, 140);
  const title = formatTitle(`${product.name} (${product.brand}) | Buy in Sriperumbudur & Chennai`);
  const description = `${product.name} by ${product.brand}. ${blurb} Ready stock, prompt dispatch across Tamil Nadu.`;
  const imagePath = detail.image || product.image || product.thumbnail || `/images/products/${product.slug}.jpg`;
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
  title: "Page not found | AeroTech Infra Equipment",
  heading: "Page not found",
  description: "That address does not match a page on the AeroTech Infra Equipment site.",
  canonical: "",
  robots: "noindex, nofollow",
  image: SHARE_IMAGE,
  imageAlt: "AeroTech Infra Equipment",
  schema: null,
  links: PRIMARY_LINKS,
});
writeFileSync(join(DIST, "404.html"), notFound);

const sampleProduct = catalog.products[0].slug;
const sampleEquipment = equipments[0].id;
const productHtml = readFileSync(join(DIST, "products", sampleProduct, "index.html"), "utf8");
const equipmentHtml = readFileSync(join(DIST, "equipment", sampleEquipment, "index.html"), "utf8");
const expectedTitle = esc(formatTitle(`${catalog.products[0].name} (${catalog.products[0].brand}) | Buy in Sriperumbudur & Chennai`));
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
