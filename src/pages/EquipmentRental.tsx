import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/pages/_equipment-page.scss";
import SectionHeader from "../components/ui/SectionHeader";
import EquipmentCard from "../components/ui/EquipmentCard";
import SEO from "../components/seo/SEO";
import { useEquipmentList } from "../lib/catalog";

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
  const { data, error, loading } = useEquipmentList();
  const equipments = useMemo(() => data ?? [], [data]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeBrand = searchParams.get("brand") || ALL;
  const activeCategory = searchParams.get("category") || ALL;

  const setFilter = (key: "brand" | "category", value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === ALL) next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  // Derive unique sorted brands and categories from data
  const brands = useMemo(() => {
    const set = new Set(equipments.map((e) => e.brand));
    return [ALL, ...Array.from(set).sort()];
  }, [equipments]);

  const categories = useMemo(() => {
    const set = new Set(equipments.map((e) => e.category_formated));
    return [ALL, ...Array.from(set).sort()];
  }, [equipments]);

  const filtered = useMemo(() => {
    return equipments.filter((e) => {
      const brandMatch = activeBrand === ALL || e.brand === activeBrand;
      const catMatch = activeCategory === ALL || e.category_formated === activeCategory;
      return brandMatch && catMatch;
    });
  }, [equipments, activeBrand, activeCategory]);

  return (
    <>
      <SEO
        title="Construction Equipment Rental Fleet | Boom Lifts, Cranes & Scissor Lifts"
        description="Browse AeroTech's heavy equipment rental fleet in Sriperumbudur & Chennai. Genie & JLG boom lifts, rough terrain scissor lifts, SANY excavators and all-terrain cranes."
        canonical="/equipment"
        schema={equipmentListSchema}
      />

      <div className="eq-detail-breadcrumb">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Equipment Rental</li>
            </ol>
          </nav>
        </div>
      </div>

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
                    onClick={() => setFilter("brand", brand)}
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
                    onClick={() => setFilter("category", cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {!loading && !error && (
            <p className="eq-result-count">
              Showing <strong>{filtered.length}</strong> machine{filtered.length !== 1 ? "s" : ""}
            </p>
          )}

          {loading ? (
            <p className="equipment-page__empty">Loading equipment…</p>
          ) : error ? (
            <p className="equipment-page__empty">{error}</p>
          ) : filtered.length > 0 ? (
            <div className="catalogue-grid">
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
