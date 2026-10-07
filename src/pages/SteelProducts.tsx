import { useState, useMemo } from "react";

// ── Images ──────────────────────────────────────────────────
import squarePipeImg    from "../assets/steel-square-pipe.jpg";
import roundPipeImg     from "../assets/steel-round-pipe.jpg";
import channelImg       from "../assets/steel-channel.jpg";
import iBeamImg         from "../assets/steel-i-beam.jpg";
import flatBarImg       from "../assets/steel-flat-bar.jpg";
import angleImg         from "../assets/steel-angle.jpg";
import roofingImg       from "../assets/steel-roofing.jpg";
import weldMeshImg      from "../assets/steel-weld-mesh.jpg";
import chainLinkImg     from "../assets/steel-chain-link.jpg";
import squareBarImg     from "../assets/steel-square-bar.jpg";
import heroBannerImg    from "../assets/steel-range.jpg";

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
    familyLabel: "Pipes & tubes",
    description: "Square hollow sections for fabrication and structural frameworks.",
    image: squarePipeImg,
    waMsg: "Square Pipe (SHS)",
  },
  {
    id: "round-pipe",
    name: "Round Pipe",
    family: "pipes-tubes",
    familyLabel: "Pipes & tubes",
    description: "Round steel pipes for fabrication and general construction requirements.",
    image: roundPipeImg,
    waMsg: "Round Pipe",
  },
  {
    id: "channel",
    name: "Channel",
    family: "structural",
    familyLabel: "Structural sections",
    description: "Open channel sections for frames, supports and steel fabrication.",
    image: channelImg,
    waMsg: "Channel",
  },
  {
    id: "i-beam",
    name: "I-Beam",
    family: "structural",
    familyLabel: "Structural sections",
    description: "I-profile steel sections for structural construction and fabrication.",
    image: iBeamImg,
    waMsg: "I-Beam",
  },
  {
    id: "flat-bar",
    name: "Flat Bar",
    family: "structural",
    familyLabel: "Structural sections",
    description: "Flat steel sections for versatile workshop and site fabrication.",
    image: flatBarImg,
    waMsg: "Flat Bar",
  },
  {
    id: "angle",
    name: "Angle",
    family: "structural",
    familyLabel: "Structural sections",
    description: "L-shaped steel angles for framing, bracing and fabrication.",
    image: angleImg,
    waMsg: "Angle",
  },
  {
    id: "square-bar",
    name: "Square Bar",
    family: "structural",
    familyLabel: "Structural sections",
    description: "Solid square steel bars for general fabrication and metalworking.",
    image: squareBarImg,
    waMsg: "Square Bar",
  },
  {
    id: "roofing-sheet",
    name: "Roofing Sheet",
    family: "roofing-mesh",
    familyLabel: "Roofing & mesh",
    description: "Profiled roofing sheets for commercial, industrial and residential projects.",
    image: roofingImg,
    waMsg: "Roofing Sheet",
  },
  {
    id: "weld-mesh",
    name: "Weld Mesh",
    family: "roofing-mesh",
    familyLabel: "Roofing & mesh",
    description: "Welded wire mesh for enclosures, partitions and fencing applications.",
    image: weldMeshImg,
    waMsg: "Weld Mesh",
  },
  {
    id: "chain-link-mesh",
    name: "Chain Link Mesh",
    family: "roofing-mesh",
    familyLabel: "Roofing & mesh",
    description: "Diamond-pattern chain link mesh for perimeter fencing and enclosures.",
    image: chainLinkImg,
    waMsg: "Chain Link Mesh",
  },
];

const FAMILIES: { value: SteelFamily; label: string }[] = [
  { value: "all",           label: "All products" },
  { value: "pipes-tubes",   label: "Pipes & tubes" },
  { value: "structural",    label: "Structural sections" },
  { value: "roofing-mesh",  label: "Roofing & mesh" },
];

const PHONE       = "+919791890636";
const WA_BASE     = `https://wa.me/919791890636?text=`;
const QUOTE_WA    = `${WA_BASE}${encodeURIComponent("Hello AeroTech, I would like a quotation for steel products. I will share my material list, sizes and quantities.")}`;

function waLink(product: string) {
  return `${WA_BASE}${encodeURIComponent(`Hello AeroTech, I am interested in ${product}. Please share price and availability.`)}`;
}

// ── Component ─────────────────────────────────────────────────
const SteelProducts = () => {
  const [search,  setSearch]  = useState("");
  const [family,  setFamily]  = useState<SteelFamily>("all");

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

  return (
    <>
      {/* ── Hero / Intro ──────────────────────────────── */}
      <section className="sp-hero" aria-label="Steel products intro">
        <div className="container sp-hero__inner">
          <nav aria-label="Breadcrumb" className="sp-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Steel products</span>
          </nav>
          <p className="sp-hero__eyebrow">AeroTech Infra Equipment · Material supply</p>
          <h1 className="sp-hero__title">
            Steel products,<br />roofing &amp; mesh.
          </h1>
          <div className="sp-hero__foot">
            <p className="sp-hero__desc">
              Steel sections and construction materials for fabricators, contractors and individual
              buyers. From a single requirement to a project material list.
            </p>
            <a
              href={QUOTE_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--accent sp-hero__cta"
              id="steel-wa-quote"
            >
              {/* WhatsApp icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true">
                <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
              </svg>
              Get a material quote
            </a>
          </div>
        </div>
        <img
          src={heroBannerImg}
          alt="Steel yard with square tubes, round pipes, channels, I-beams, flat bars and angles"
          className="sp-hero__banner"
          loading="eager"
        />
      </section>

      {/* ── Product Grid ─────────────────────────────────── */}
      <section className="sp-catalogue" aria-label="Steel product catalogue">
        <div className="container">
          {/* Section header + search */}
          <div className="sp-catalogue__head">
            <div>
              <p className="sp-catalogue__eyebrow">Our material range</p>
              <h2 className="sp-catalogue__title">Find your steel product</h2>
            </div>
            <div className="sp-catalogue__search-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="sp-catalogue__search-icon" aria-hidden="true">
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
              <label htmlFor="steel-search" className="sr-only">Search steel products</label>
              <input
                id="steel-search"
                placeholder="Search steel products"
                className="sp-catalogue__search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Category filter pills */}
          <div className="sp-catalogue__families" role="group" aria-label="Product families">
            {FAMILIES.map((f) => (
              <button
                key={f.value}
                type="button"
                className={`sp-catalogue__pill${family === f.value ? " sp-catalogue__pill--active" : ""}`}
                aria-pressed={family === f.value}
                onClick={() => setFamily(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Result count */}
          <p role="status" className="sp-catalogue__count">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} · Enquire for available sizes, thicknesses and pricing
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="sp-catalogue__grid">
              {filtered.map((p) => (
                <article key={p.id} className="sp-card" id={`steel-product-${p.id}`}>
                  <div className="sp-card__img-wrap">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="sp-card__img"
                    />
                  </div>
                  <div className="sp-card__body">
                    <div className="sp-card__meta">
                      <span className="sp-card__family">{p.familyLabel}</span>
                      <span className="sp-card__material">Steel</span>
                    </div>
                    <h3 className="sp-card__name">{p.name}</h3>
                    <p className="sp-card__desc">{p.description}</p>
                    <div className="sp-card__actions">
                      <a
                        href={waLink(p.waMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--dark sp-card__enquire"
                        id={`steel-enquire-${p.id}`}
                      >
                        Enquire Now
                      </a>
                      <a
                        href={`tel:${PHONE}`}
                        className="btn btn--outline-dark sp-card__call"
                        id={`steel-call-${p.id}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          aria-hidden="true">
                          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                        </svg>
                        Call
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="sp-catalogue__empty">
              <p>No products match your search.</p>
              <button type="button" className="btn btn--accent" onClick={() => { setSearch(""); setFamily("all"); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Beyond Structural ─────────────────────────── */}
      <section className="sp-beyond" aria-label="Roofing and mesh detail">
        <div className="container">
          <h2 className="sp-beyond__title">Beyond structural steel</h2>
          <div className="sp-beyond__grid">
            {/* Roofing */}
            <div className="sp-beyond__item">
              <img
                src={roofingImg}
                alt="Profiled roofing sheets in galvanized finish"
                loading="lazy"
                className="sp-beyond__img"
              />
              <h3 className="sp-beyond__name">Roofing sheets</h3>
              <p className="sp-beyond__text">
                Profiled sheets for industrial sheds, commercial buildings and site offices. Available
                in galvanized and colour-coated finish. Enquire for gauge, profile and sheet lengths.
              </p>
            </div>
            {/* Mesh */}
            <div className="sp-beyond__item">
              <img
                src={weldMeshImg}
                alt="Welded wire mesh panels"
                loading="lazy"
                className="sp-beyond__img"
              />
              <h3 className="sp-beyond__name">Weld mesh &amp; chain link</h3>
              <p className="sp-beyond__text">
                Welded mesh panels for partitions, cages and security enclosures. Chain link rolls for
                site perimeter fencing and compound boundaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────── */}
      <section className="sp-cta" aria-label="Get a material quote">
        <div className="container sp-cta__inner">
          <div className="sp-cta__text">
            <h2 className="sp-cta__title">Need a full material list quoted?</h2>
            <p className="sp-cta__desc">
              Share your list of sizes and quantities — we'll come back with competitive pricing,
              fast. Available for walk-in customers in Sriperumbudur too.
            </p>
          </div>
          <div className="sp-cta__actions">
            <a
              href={QUOTE_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--accent"
              id="steel-cta-whatsapp"
            >
              WhatsApp us your list
            </a>
            <a href={`tel:${PHONE}`} className="btn btn--outline-light" id="steel-cta-call">
              Call us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default SteelProducts;
