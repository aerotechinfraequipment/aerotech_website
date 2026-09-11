import heroImg from "../../assets/hero-boom-lift.jpg";
import heroBgVideo from "../../assets/hero_bg.mp4"
import Button from "../ui/Button";

const HeroSection = () => {
  return (
    <section className="hero">
      <video
        autoPlay
        muted
        loop
        playsInline
        src={heroBgVideo}
        className="hero__bg"
      />
      <div className="hero__gradient" />

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__subtitle">Sriperumbudur · Tamil Nadu</p>
          <h1 className="hero__title">
            Industrial Equipment Solutions for Demanding Projects
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
