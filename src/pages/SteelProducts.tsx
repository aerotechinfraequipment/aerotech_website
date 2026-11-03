import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/pages/_products-page.scss";
import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/Button";
import SEO from "../components/seo/SEO";

// ── Images ──────────────────────────────────────────────────
import squarePipeImg from "../assets/steel-square-pipe.jpg";
import roundPipeImg from "../assets/steel-round-pipe.jpg";
import channelImg from "../assets/steel-channel.jpg";
import iBeamImg from "../assets/steel-i-beam.jpg";
import flatBarImg from "../assets/steel-flat-bar.jpg";
import angleImg from "../assets/steel-angle.jpg";
import roofingImg from "../assets/steel-roofing.jpg";
import weldMeshImg from "../assets/steel-weld-mesh.jpg";
import chainLinkImg from "../assets/steel-chain-link.jpg";
import squareBarImg from "../assets/steel-square-bar.jpg";

// ── Data ─────────────────────────────────────────────────────
type SteelFamily = "all" | "pipes-tubes" | "structural" | "roofing-mesh";

interface SteelProduct {
  id: string;
  name: string;
  family: Exclude<SteelFamily, "all">;
  familyLabel: string;
  description: string;
  image: string;
  waMsg: string;
}

const STEEL_PRODUCTS: SteelProduct[] = [
  {
    id: "square-pipe",
    name: "Square Pipe (SHS)",
    family: "pipes-tubes",
    familyLabel: "Pipes & Tubes",
    description: "Square hollow sections for fabrication and structural frameworks.",
    image: squarePipeImg,
    waMsg: "Square Pipe (SHS)",
  },
  {
    id: "round-pipe",
    name: "Round Pipe",
    family: "pipes-tubes",
    familyLabel: "Pipes & Tubes",
    description: "Round steel pipes for fabrication and general construction requirements.",
    image: roundPipeImg,
    waMsg: "Round Pipe",
  },
  {
    id: "channel",
    name: "Channel",
    family: "structural",
    familyLabel: "Structural Sections",
    description: "Open channel sections for frames, supports and steel fabrication.",
    image: channelImg,
    waMsg: "Channel",
  },
  {
    id: "i-beam",
    name: "I-Beam",
    family: "structural",
    familyLabel: "Structural Sections",
    description: "I-profile steel sections for structural construction and fabrication.",
    image: iBeamImg,
    waMsg: "I-Beam",
  },
  {
    id: "flat-bar",
    name: "Flat Bar",
    family: "structural",
    familyLabel: "Structural Sections",
    description: "Flat steel sections for versatile workshop and site fabrication.",
    image: flatBarImg,
    waMsg: "Flat Bar",
  },
  {
    id: "angle",
    name: "Angle",
    family: "structural",
    familyLabel: "Structural Sections",
    description: "L-shaped steel angles for framing, bracing and fabrication.",
    image: angleImg,
    waMsg: "Angle",
  },
  {
    id: "square-bar",
    name: "Square Bar",
    family: "structural",
    familyLabel: "Structural Sections",
    description: "Solid square steel bars for general fabrication and metalworking.",
    image: squareBarImg,
    waMsg: "Square Bar",
  },
  {
    id: "roofing-sheet",
    name: "Roofing Sheet",
    family: "roofing-mesh",
    familyLabel: "Roofing & Mesh",
    description: "Profiled roofing sheets for commercial, industrial and residential projects.",
    image: roofingImg,
    waMsg: "Roofing Sheet",
  },
  {
    id: "weld-mesh",
    name: "Weld Mesh",
    family: "roofing-mesh",
    familyLabel: "Roofing & Mesh",
    description: "Welded wire mesh for enclosures, partitions and fencing applications.",
    image: weldMeshImg,
    waMsg: "Weld Mesh",
  },
  {
    id: "chain-link-mesh",
    name: "Chain Link Mesh",
    family: "roofing-mesh",
    familyLabel: "Roofing & Mesh",
    description: "Diamond-pattern chain link mesh for perimeter fencing and enclosures.",
    image: chainLinkImg,
    waMsg: "Chain Link Mesh",
  },
];

const FAMILIES: { value: SteelFamily; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "pipes-tubes", label: "Pipes & Tubes" },
  { value: "structural", label: "Structural Sections" },
  { value: "roofing-mesh", label: "Roofing & Mesh" },
];

const WA_BASE = "https://wa.me/919791890636?text=";

function waLink(product: string) {
  return `${WA_BASE}${encodeURIComponent(
    `Hello AeroTech, I am interested in ${product}. Please share price and availability.`
  )}`;
}

const steelSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Steel Products, Roofing & Mesh Supply",
  "description": "High-grade structural steel, square pipes, round pipes, channels, beams, angles, roofing sheets, and weld mesh supplied across Tamil Nadu.",
  "url": "https://aerotechinfra.com/steel-products",
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
        "name": "Steel Products",
        "item": "https://aerotechinfra.com/steel-products"
      }
    ]
  }
};

// ── Component ─────────────────────────────────────────────────
const SteelProducts = () => {
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
    return STEEL_PRODUCTS.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.familyLabel.toLowerCase().includes(search.toLowerCase());
      const matchFamily = family === "all" || p.family === family;
      return matchSearch && matchFamily;
    });
  }, [search, family]);

  const hasFilters = search || family !== "all";

  const clearFilters = () => setSearchParams({}, { replace: true });

  return (
    <>
      <SEO
        title="Structural Steel, Pipes, Roofing & Mesh Supply | AeroTech"
        description="Source structural steel, square & round pipes, channels, I-beams, angles, roofing sheets, and chain link mesh from AeroTech in Sriperumbudur, Tamil Nadu."
        canonical="/steel-products"
        schema={steelSchema}
      />

      {/* ── Page Hero ───────────────────────────────── */}
      <section className="page-hero page-hero--dark" aria-label="Steel products catalogue">
        <div className="container">
          <SectionHeader
            title="Steel products, roofing & mesh"
            description="Steel sections and construction materials for fabricators, contractors and individual buyers. From a single requirement to a full project material list."
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
          {filtered.length > 0 ? (
            <div className="catalogue-grid">
              {filtered.map((p) => (
                <article key={p.id} className="product-card">
                  <div className="product-card__image product-card__image--cover">
                    <img
                      src={p.image}
                      alt={`${p.name} - ${p.familyLabel}`}
                      width={1024}
                      height={1024}
                      loading="lazy"
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
                      <Button variant="dark" href={waLink(p.waMsg)} external>
                        Enquire Now
                      </Button>
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
