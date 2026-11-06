import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/pages/_products-page.scss";
import SectionHeader from "../components/ui/SectionHeader";
import ProductCard from "../components/ui/ProductCard";
import SEO from "../components/seo/SEO";
import { productFilterOptions, useProducts } from "../lib/catalog";

const productsListSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Industrial Products & Hardware Catalogue",
  "description": "Genuine industrial tools, welding equipment, fasteners, paints, and safety equipment from ESAB, Bosch, DeWalt, Taparia, Stanley, and 3M.",
  "url": "https://aerotechinfraequipment.com/products",
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
        "name": "Industrial Products",
        "item": "https://aerotechinfraequipment.com/products"
      }
    ]
  }
};

const Products = () => {
  const { data, error, loading } = useProducts();
  const productsData = useMemo(() => data ?? [], [data]);
  const { categories: productCategories, brands: productBrands, types: productTypes } = useMemo(
    () => productFilterOptions(productsData),
    [productsData],
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const brand = searchParams.get("brand") ?? "";
  const type = searchParams.get("type") ?? "";

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftSearch, setDraftSearch] = useState(search);
  const [draftCategory, setDraftCategory] = useState(category);
  const [draftBrand, setDraftBrand] = useState(brand);
  const [draftType, setDraftType] = useState(type);

  const activeFilterCount = [category, brand, type].filter(Boolean).length;

  const filtered = useMemo(() => {
    return productsData.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || p.category === category;
      const matchBrand = !brand || p.brand === brand;
      const matchType = !type || p.type === type;
      return matchSearch && matchCategory && matchBrand && matchType;
    });
  }, [productsData, search, category, brand, type]);

  const hasFilters = search || category || brand || type;

  const applyFilters = () => {
    const next = new URLSearchParams();
    if (draftSearch.trim()) next.set("q", draftSearch.trim());
    if (draftCategory) next.set("category", draftCategory);
    if (draftBrand) next.set("brand", draftBrand);
    if (draftType) next.set("type", draftType);
    setSearchParams(next, { replace: true });
    setFiltersOpen(false);
  };

  const clearFilters = () => {
    setDraftSearch("");
    setDraftCategory("");
    setDraftBrand("");
    setDraftType("");
    setSearchParams({}, { replace: true });
    setFiltersOpen(false);
  };

  return (
    <>
      <SEO
        title="Industrial Products & Hardware Catalogue | Power Tools, Welding & Safety"
        description="Shop genuine industrial products and hardware in Sriperumbudur & Chennai. Bosch, ESAB, Taparia, Stanley, Berger, Asian Paints, and 3M. Prompt dispatch and GST invoicing."
        canonical="/products"
        schema={productsListSchema}
      />

      {/* ── Hero Banner ───────────────────────────────── */}
      <section className="page-hero page-hero--dark" aria-label="Products catalogue">
        <div className="container">
          <SectionHeader
            title="Industrial products & hardware"
            description="Genuine products from leading brands — available to businesses and walk-in customers. Search or filter to find what you need."
            theme="dark"
            as="h1"
          />
        </div>
      </section>

      {/* ── Filters + Grid ────────────────────────────── */}
      <section className="products-page" aria-label="Products catalogue">
        <div className="container">

          <form
            className="catalogue-toolbar"
            onSubmit={(e) => {
              e.preventDefault();
              applyFilters();
            }}
          >
            <input
              id="p-search"
              type="search"
              placeholder="Search products…"
              className="products-page__filter-input catalogue-toolbar__search"
              value={draftSearch}
              onChange={(e) => setDraftSearch(e.target.value)}
              aria-label="Search products"
            />
            <button
              type="button"
              className="catalogue-toolbar__toggle"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((open) => !open)}
            >
              Filters
              {activeFilterCount > 0 && (
                <span className="catalogue-toolbar__count">{activeFilterCount}</span>
              )}
            </button>
          </form>

          {filtersOpen && (
            <div className="catalogue-filters">
              <div className="products-page__filter-field">
                <label htmlFor="p-category" className="products-page__filter-label">Category</label>
                <select
                  id="p-category"
                  className="products-page__filter-input"
                  value={draftCategory}
                  onChange={(e) => setDraftCategory(e.target.value)}
                >
                  {productCategories.map((cat) => (
                    <option key={cat.slug || "all"} value={cat.slug}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div className="products-page__filter-field">
                <label htmlFor="p-brand" className="products-page__filter-label">Brand</label>
                <select
                  id="p-brand"
                  className="products-page__filter-input"
                  value={draftBrand}
                  onChange={(e) => setDraftBrand(e.target.value)}
                >
                  <option value="">All brands</option>
                  {productBrands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="products-page__filter-field">
                <label htmlFor="p-type" className="products-page__filter-label">Type</label>
                <select
                  id="p-type"
                  className="products-page__filter-input"
                  value={draftType}
                  onChange={(e) => setDraftType(e.target.value)}
                >
                  <option value="">All types</option>
                  {productTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="catalogue-filters__actions">
                <button type="button" className="btn btn--outline-dark" onClick={clearFilters}>Clear</button>
                <button type="button" className="btn btn--accent" onClick={applyFilters}>Apply</button>
              </div>
            </div>
          )}

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

          {loading ? (
            <div className="products-page__empty">
              <p>Loading products…</p>
            </div>
          ) : error ? (
            <div className="products-page__empty">
              <p>{error}</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="catalogue-grid">
              {filtered.map((item) => (
                <ProductCard key={item.id} item={item} />
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

export default Products;
