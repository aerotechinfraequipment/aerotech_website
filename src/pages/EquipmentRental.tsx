import { useState, useMemo } from "react";
import SectionHeader from "../components/ui/SectionHeader";
import EquipmentCard from "../components/ui/EquipmentCard";
import SEO from "../components/seo/SEO";
import { equipments } from "../data/equipment/list";

const ALL = "All";

const equipmentListSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Construction Equipment Rental Fleet",
  "description": "Inspected, site-ready boom lifts, scissor lifts, excavators, and cranes for daily, weekly, and monthly hire across Tamil Nadu.",
  "url": "https://aerotechinfra.com/equipment",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://aerotechinfra.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Equipment Rental",
        "item": "https://aerotechinfra.com/equipment"
      }
    ]
  }
};

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
      <SEO
        title="Construction Equipment Rental Fleet | Boom Lifts, Cranes & Scissor Lifts"
        description="Browse AeroTech's heavy equipment rental fleet in Sriperumbudur & Chennai. Genie & JLG boom lifts, rough terrain scissor lifts, SANY excavators and all-terrain cranes."
        canonical="/equipment"
        keywords="equipment rental fleet, boom lift rental Tamil Nadu, scissor lift hire Chennai, Genie boom lift, JLG articulated lift, SANY crane rental, excavator rental"
        schema={equipmentListSchema}
      />

      {/* ── Hero Banner ───────────────────────────────── */}
      <section className="page-hero page-hero--dark" aria-label="Equipment Rental">
        <div className="container">
          <SectionHeader
            title="Our rental fleet"
            description="Every machine is inspected, maintained and ready for productive work on your site. Daily and monthly rental plans available."
            theme="dark"
            as="h1"
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
