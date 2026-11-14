import heroPoster from "../../assets/hero-poster.jpg";
import Button from "../ui/Button";

const HeroSection = () => {
  return (
    <section className="hero">
      <img
        src={heroPoster}
        alt="Yellow articulated boom lift on a construction site"
        className="hero__poster"
        width={1280}
        height={720}
        fetchPriority="high"
      />
      <div className="hero__gradient" />

      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">
            Construction Equipment &amp; Infrastructure Solutions
          </h1>
          <p className="hero__desc">
            Well-maintained construction equipment on flexible daily and monthly rental,
            backed by a complete range of genuine industrial products and hardware.
          </p>
          <div className="hero__actions">
            <Button variant="accent" to="/equipment">Explore Rental Equipment</Button>
            <Button variant="outline" to="/contact#quote">Request a Quote</Button>
          </div>
          <ul className="hero__features">
            <li><span className="hero__dot" aria-hidden="true" /> Daily &amp; monthly rental</li>
            <li><span className="hero__dot" aria-hidden="true" /> Inspected, site-ready machines</li>
            <li><span className="hero__dot" aria-hidden="true" /> Genuine industrial brands</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
