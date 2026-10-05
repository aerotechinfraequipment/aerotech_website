import { useParams, Link, Navigate } from "react-router-dom";
import { equipments } from "../data/equipment/list";
import Button from "../components/ui/Button";

const EquipmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const item = equipments.find((e) => e.id === id);

  // 404 fallback — redirect to equipment list
  if (!item) return <Navigate to="/equipment" replace />;

  const isAvailable = item.status === "available";

  const whatsappMsg = encodeURIComponent(
    `Hello AeroTech, I am interested in renting the ${item.name}. Please share availability and rental pricing.`
  );

  return (
    <>
      {/* ── Breadcrumb ──────────────────────────────── */}
      <div className="eq-detail-breadcrumb">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/equipment">Equipment Rental</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{item.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ── Main Detail Layout ───────────────────────── */}
      <section className="eq-detail" aria-label={item.name}>
        <div className="container eq-detail__grid">

          {/* ── Left: Image panel ───────────────────── */}
          <div className="eq-detail__image-panel">
            <div className="eq-detail__img-wrap">
              <img
                src={item.image}
                alt={item.name}
                className="eq-detail__img"
              />
              {/* Availability badge */}
              <span
                className={`eq-detail__badge ${
                  isAvailable ? "eq-detail__badge--available" : "eq-detail__badge--rented"
                }`}
              >
                <span className="eq-detail__badge-dot" />
                {isAvailable ? "Available for Rent" : "Currently Rented"}
              </span>
            </div>
          </div>

          {/* ── Right: Info panel ───────────────────── */}
          <div className="eq-detail__info">

            {/* Brand + Category */}
            <div className="eq-detail__meta">
              <span className="eq-detail__brand">{item.brand}</span>
              <span className="eq-detail__sep">·</span>
              <span className="eq-detail__cat">{item.category_formated}</span>
            </div>

            {/* Name */}
            <h1 className="eq-detail__name">{item.name}</h1>

            {/* Rental type tag */}
            <p className="eq-detail__rental-tag">
              <span className="eq-detail__rental-icon">📅</span>
              {item.rentalType}
            </p>

            {/* Divider */}
            <hr className="eq-detail__divider" />

            {/* Description */}
            <div className="eq-detail__desc">
              <h2 className="eq-detail__section-title">About this machine</h2>
              <p>{item.description}</p>
            </div>

            {/* Models */}
            {item.models?.length > 0 && (
              <div className="eq-detail__models">
                <h2 className="eq-detail__section-title">Available Models</h2>
                <ul className="eq-detail__model-list">
                  {item.models.map((m) => (
                    <li key={m} className="eq-detail__model-item">
                      <span className="eq-detail__model-dot" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Divider */}
            <hr className="eq-detail__divider" />

            {/* CTAs */}
            <div className="eq-detail__ctas">
              <Button
                variant="accent"
                href={`https://wa.me/919791890636?text=${whatsappMsg}`}
                external
              >
                Get Quote on WhatsApp
              </Button>
              <Button variant="dark" href="tel:+919791890636">
                Call Us
              </Button>
            </div>

            {/* Back link */}
            <Link to="/equipment" className="eq-detail__back">
              ← Back to Equipment Rental
            </Link>

          </div>
        </div>
      </section>

      {/* ── Info cards strip ────────────────────────── */}
      <section className="eq-detail-strip">
        <div className="container eq-detail-strip__grid">
          <div className="eq-detail-strip__card">
            <span className="eq-detail-strip__icon">🔍</span>
            <h3>Inspected &amp; Maintained</h3>
            <p>Every machine is serviced before dispatch so you get reliability from day one.</p>
          </div>
          <div className="eq-detail-strip__card">
            <span className="eq-detail-strip__icon">📦</span>
            <h3>Flexible Rental Plans</h3>
            <p>Daily, weekly and monthly rental plans available to suit your project timeline.</p>
          </div>
          <div className="eq-detail-strip__card">
            <span className="eq-detail-strip__icon">🚚</span>
            <h3>On-site Delivery</h3>
            <p>We arrange transport and delivery to your worksite across Tamil Nadu.</p>
          </div>
          <div className="eq-detail-strip__card">
            <span className="eq-detail-strip__icon">🛠️</span>
            <h3>Technical Support</h3>
            <p>Our team is available by phone and WhatsApp throughout your rental period.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default EquipmentDetail;
