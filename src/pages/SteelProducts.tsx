import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/pages/_products-page.scss";
import SectionHeader from "../components/ui/SectionHeader";
import ItemEnquiry from "../components/forms/ItemEnquiry";
import SEO from "../components/seo/SEO";
import { useSteel } from "../lib/catalog";

type SteelFamily = "all" | "pipes-tubes" | "structural" | "roofing-mesh";

const FAMILIES: { value: SteelFamily; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "pipes-tubes", label: "Pipes & Tubes" },
  { value: "structural", label: "Structural Sections" },
  { value: "roofing-mesh", label: "Roofing & Mesh" },
];

const steelSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Steel Products, Roofing & Mesh",
  "description": "Order square pipes, round pipes, channels, I-beams, angles, roofing sheets, and chain-link mesh for fabrication and site work across Tamil Nadu.",
  "url": "https://aerotechinfraequipment.com/steel-products",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://aerotechinfraequipment.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Steel Products",
        "item": "https://aerotechinfraequipment.com/steel-products"
      }
    ]
  }
};

// ── Component ─────────────────────────────────────────────────
const SteelProducts = () => {
  const { data, error, loading } = useSteel();
  const steelProducts = useMemo(() => data ?? [], [data]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";
  const familyParam = searchParams.get("family") ?? "all";
  const family: SteelFamily = FAMILIES.some((f) => f.value === familyParam)
    ? (familyParam as SteelFamily)
    : "all";

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || (key === "family" && value === "all")) next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    return steelProducts.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.familyLabel.toLowerCase().includes(search.toLowerCase());
      const matchFamily = family === "all" || p.family === family;
      return matchSearch && matchFamily;
    });
  }, [steelProducts, search, family]);

  const hasFilters = search || family !== "all";

  const clearFilters = () => setSearchParams({}, { replace: true });

  return (
    <>
      <SEO
        title="Structural Steel, Pipes, Roofing & Mesh"
        description="Order square pipes, round pipes, channels, I-beams, angles, roofing sheets, and chain-link mesh for fabrication and site work across Tamil Nadu."
        canonical="/steel-products"
        schema={steelSchema}
      />

      {/* ── Page Hero ───────────────────────────────── */}
      <section className="page-hero page-hero--dark" aria-label="Steel products catalogue">
        <div className="container">
          <SectionHeader
            title="Steel Products, Roofing & Mesh"
            description="Sections and site materials for fabricators, contractors, and individual buyers."
            theme="dark"
            as="h1"
          />
        </div>
      </section>

      {/* ── Filters + Grid ──────────────────────────── */}
      <section className="products-page" aria-label="Steel products catalogue">
        <div className="container">

          {/* Filter bar — search + category only (2-col) */}
          <div className="products-page__filters products-page__filters--duo">
            {/* Search */}
            <div className="products-page__filter-field">
              <label htmlFor="s-search" className="products-page__filter-label">
                Search
              </label>
              <input
                id="s-search"
                type="search"
                placeholder="Search steel products…"
                className="products-page__filter-input"
                value={search}
                onChange={(e) => setParam("q", e.target.value)}
              />
            </div>

            {/* Family */}
            <div className="products-page__filter-field">
              <label htmlFor="s-family" className="products-page__filter-label">
                Category
              </label>
              <select
                id="s-family"
                className="products-page__filter-input"
                value={family}
                onChange={(e) => setParam("family", e.target.value)}
              >
                {FAMILIES.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filter meta */}
          {hasFilters && (
            <div className="products-page__meta">
              <span className="products-page__count">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
              </span>
              <button
                type="button"
                className="products-page__clear"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}

          {/* 3-column product grid */}
          {loading ? (
            <div className="products-page__empty">
              <p>Loading steel products…</p>
            </div>
          ) : error ? (
            <div className="products-page__empty">
              <p>{error}</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="catalogue-grid">
              {filtered.map((p, index) => (
                <article key={p.id} className="product-card">
                  <div className="product-card__image product-card__image--cover">
                    <img
                      src={p.imageSm}
                      srcSet={`${p.imageSm} 480w, ${p.image} 960w`}
                      sizes="(min-width: 1200px) calc((min(100vw, 1280px) - 4rem - 4.5rem) / 4), (min-width: 1024px) calc((min(100vw, 1280px) - 4rem - 2.5rem) / 3), (min-width: 768px) calc((100vw - 3rem - 2.5rem) / 3), (min-width: 640px) calc((100vw - 3rem - 0.625rem) / 2), calc((100vw - 2rem - 0.625rem) / 2)"
                      alt={`${p.name}, ${p.familyLabel.toLowerCase()}`}
                      width={480}
                      height={480}
                      loading={index < 4 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding={index === 0 ? "sync" : "async"}
                    />
                  </div>

                  <div className="product-card__body">
                    <div className="product-card__meta">
                      <span className="product-card__brand">{p.familyLabel}</span>
                      <span className="product-card__category">Steel</span>
                    </div>
                    <h3 className="product-card__name">{p.name}</h3>
                    <p className="product-card__excerpt">{p.description}</p>
                    <div className="product-card__actions">
                      <ItemEnquiry
                        type="steel"
                        itemId={p.id}
                        itemName={p.name}
                        whatsappText={`Hello AeroTech, I am interested in ${p.name}. Please share price and availability.`}
                        label="Enquire Now"
                        variant="dark"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="products-page__empty">
              <p>No products match your filters.</p>
              <button type="button" className="btn btn--accent" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SteelProducts;
