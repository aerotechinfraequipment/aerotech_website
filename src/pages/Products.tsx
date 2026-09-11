import { useState, useMemo } from "react";
import SectionHeader from "../components/ui/SectionHeader";
import ProductCard from "../components/ui/ProductCard";
import {
  productsData,
  productCategories,
  productBrands,
  productTypes,
} from "../data/products";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");

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
  }, [search, category, brand, type]);

  const hasFilters = search || category || brand || type;

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setBrand("");
    setType("");
  };

  return (
    <>
      {/* ── Hero Banner ───────────────────────────────── */}
      <section className="page-hero page-hero--dark" aria-label="Products catalogue">
        <div className="container">
          <SectionHeader
            subtitle="Product Catalogue"
            title="Industrial products & hardware"
            description="Genuine products from leading brands — available to businesses and walk-in customers. Search or filter to find what you need."
            theme="dark"
          />
        </div>
      </section>

      {/* ── Filters + Grid ────────────────────────────── */}
      <section className="products-page" aria-label="Products catalogue">
        <div className="container">

          {/* 4-column filter bar */}
          <div className="products-page__filters">
            {/* Search */}
            <div className="products-page__filter-field">
              <label htmlFor="p-search" className="products-page__filter-label">
                Search
              </label>
              <input
                id="p-search"
                type="search"
                placeholder="Search products…"
                className="products-page__filter-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="products-page__filter-field">
              <label htmlFor="p-category" className="products-page__filter-label">
                Category
              </label>
              <select
                id="p-category"
                className="products-page__filter-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {productCategories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div className="products-page__filter-field">
              <label htmlFor="p-brand" className="products-page__filter-label">
                Brand
              </label>
              <select
                id="p-brand"
                className="products-page__filter-input"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="">All brands</option>
                {productBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="products-page__filter-field">
              <label htmlFor="p-type" className="products-page__filter-label">
                Type
              </label>
              <select
                id="p-type"
                className="products-page__filter-input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All types</option>
                {productTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
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

          {/* Product grid */}
          {filtered.length > 0 ? (
            <div className="products-page__grid">
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
