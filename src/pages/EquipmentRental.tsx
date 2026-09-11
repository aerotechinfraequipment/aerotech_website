import { useState, useMemo } from "react";
import SectionHeader from "../components/ui/SectionHeader";
import EquipmentCard from "../components/ui/EquipmentCard";
import { equipmentData } from "../data/equipment";

// Derive unique categories from data
const ALL = "All";
const getCategories = () => {
  const cats = new Set(equipmentData.map((e) => e.category));
  return [ALL, ...Array.from(cats)];
};

const EquipmentRental = () => {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const categories = useMemo(() => getCategories(), []);

  const filtered = useMemo(
    () =>
      activeCategory === ALL
        ? equipmentData
        : equipmentData.filter((e) => e.category === activeCategory),
    [activeCategory]
  );

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

          {/* Category filter pills */}
          <div
            className="filter-pills"
            role="group"
            aria-label="Filter by category"
          >
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

          {/* Equipment grid */}
          {filtered.length > 0 ? (
            <div className="equipment-page__grid">
              {filtered.map((item) => (
                <EquipmentCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="equipment-page__empty">No equipment found for this category.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default EquipmentRental;
