import { useState, useMemo } from "react";
import SectionHeader from "../components/ui/SectionHeader";
import EquipmentCard from "../components/ui/EquipmentCard";
import { equipments } from "../data/equipment/list";

const ALL = "All";

const EquipmentRental = () => {
  const [activeBrand, setActiveBrand] = useState(ALL);
  const [activeCategory, setActiveCategory] = useState(ALL);

  // Derive unique sorted brands and categories from data
  const brands = useMemo(() => {
    const set = new Set(equipments.map((e) => e.brand));
    return [ALL, ...Array.from(set).sort()];
  }, []);

  const categories = useMemo(() => {
    const set = new Set(equipments.map((e) => e.category_formated));
    return [ALL, ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    return equipments.filter((e) => {
      const brandMatch = activeBrand === ALL || e.brand === activeBrand;
      const catMatch = activeCategory === ALL || e.category_formated === activeCategory;
      return brandMatch && catMatch;
    });
  }, [activeBrand, activeCategory]);

  return (
    <>
      {/* ── Hero Banner ───────────────────────────────── */}
      <section className="page-hero page-hero--dark" aria-label="Equipment Rental">
        <div className="container">
          <SectionHeader
            subtitle="Equipment Rental"
            title="Our rental fleet"
            description="Every machine is inspected, maintained and ready for productive work on your site. Daily and monthly rental plans available."
            theme="dark"
          />
        </div>
      </section>

      {/* ── Filter + Grid ─────────────────────────────── */}
      <section className="equipment-page" aria-label="Rental fleet catalogue">
        <div className="container">

          {/* Filter bar */}
          <div className="eq-filters">
            {/* Brand filter */}
            <div className="eq-filters__group">
              <span className="eq-filters__label">Brand</span>
              <div className="filter-pills" role="group" aria-label="Filter by brand">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    className={`filter-pill${activeBrand === brand ? " filter-pill--active" : ""}`}
                    aria-pressed={activeBrand === brand}
                    onClick={() => setActiveBrand(brand)}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div className="eq-filters__group">
              <span className="eq-filters__label">Category</span>
              <div className="filter-pills" role="group" aria-label="Filter by category">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`filter-pill${activeCategory === cat ? " filter-pill--active" : ""}`}
                    aria-pressed={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result count */}
          <p className="eq-result-count">
            Showing <strong>{filtered.length}</strong> machine{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Equipment grid */}
          {filtered.length > 0 ? (
            <div className="equipment-page__grid">
              {filtered.map((item) => (
                <EquipmentCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="equipment-page__empty">No equipment found for the selected filters.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default EquipmentRental;
