const BASE = "https://aerotechinfraequipment.com";

const FIXED = [
  ["/", "2026-11-14", "daily", "1.0"],
  ["/equipment", "2026-11-14", "weekly", "0.9"],
  ["/products", "2026-11-14", "weekly", "0.9"],
  ["/steel-products", "2026-11-14", "weekly", "0.8"],
  ["/about", "2026-11-14", "monthly", "0.7"],
  ["/blogs", "2026-11-14", "weekly", "0.7"],
  ["/contact", "2026-11-14", "monthly", "0.8"],
];

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function day(value, fallback) {
  const text = String(value || "");
  return /^\d{4}-\d{2}-\d{2}/.test(text) ? text.slice(0, 10) : fallback;
}

async function rest(path) {
  const base = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "").replace(/\/$/, "");
  const key = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  if (!base || !key) return [];
  try {
    const response = await fetch(`${base}/rest/v1/${path}`, {
      headers: {
        apikey: key,
        authorization: `Bearer ${key}`,
        accept: "application/json",
      },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function entry(path, lastmod, freq, priority) {
  const loc = path === "/" ? `${BASE}/` : `${BASE}${path}`;
  return `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${esc(lastmod)}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

export default async function handler(_req, res) {
  const today = new Date().toISOString().slice(0, 10);
  const [blogs, equipment, products] = await Promise.all([
    rest("blogs?select=slug,updated_at&status=eq.published&archived_at=is.null&order=sort_order.asc"),
    rest("equipment?select=id,updated_at&archived_at=is.null&order=sort_order.asc"),
    rest("products?select=slug,updated_at&archived_at=is.null&order=name.asc"),
  ]);
  const urls = [
    ...FIXED.map(([path, lastmod, freq, priority]) => entry(path, lastmod, freq, priority)),
    ...equipment.map((item) => entry(`/equipment/${item.id}`, day(item.updated_at, today), "weekly", "0.8")),
    ...products.map((item) => entry(`/products/${item.slug}`, day(item.updated_at, today), "weekly", "0.8")),
    ...blogs.map((item) => entry(`/blogs/${item.slug}`, day(item.updated_at, today), "monthly", "0.6")),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300");
  res.status(200).send(xml);
}
