import rentalImg from "../../assets/division-rental.jpg";
import productsImg from "../../assets/division-products.jpg";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";

const PartnerDivisions = () => {
  return (
    <section className="divisions">
      <div className="container">
        <SectionHeader
          subtitle="Two Divisions"
          title="One partner for equipment and supply"
          description="Choose how you want to work with us — rent the machines that keep your project moving, or source the industrial products your team needs."
        />
        <div className="divisions__grid">
          <article className="division-card">
            <img src={rentalImg} alt="Construction equipment ready for rental" loading="lazy" />
            <div className="division-card__overlay" />
            <div className="division-card__content">
              <p className="division-card__label">Division 01</p>
              <h3 className="division-card__title">Construction Equipment Rental</h3>
              <p className="division-card__desc">
                Boom lifts, scissor lifts, excavators and cranes — available on daily and monthly rental, delivered site-ready.
              </p>
              <Button variant="accent" to="/equipment">Browse Rental Fleet</Button>
            </div>
          </article>

          <article className="division-card">
            <img src={productsImg} alt="Industrial products and hardware" loading="lazy" />
            <div className="division-card__overlay" />
            <div className="division-card__content">
              <p className="division-card__label">Division 02</p>
              <h3 className="division-card__title">Industrial Products &amp; Hardware</h3>
              <p className="division-card__desc">
                Pneumatics, power tools, welding equipment, valves and measuring instruments from leading brands — for businesses and walk-in customers alike.
              </p>
              <Button variant="ghost" to="/products" className="btn--white">View Product Catalogue</Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default PartnerDivisions;
