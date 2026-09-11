import companyImg from "../../assets/company.jpg";
import Button from "../ui/Button";

const stats = [
  { value: "10+", label: "Years of service" },
  { value: "500+", label: "Products in range" },
  { value: "12", label: "Trusted brands" },
];

const AboutStats = () => {
  return (
    <section className="about-section">
      <div className="container about-section__grid">
        <div className="about-section__image">
          <img src={companyImg} alt="AeroTech Infra Equipment yard and office" loading="lazy" />
        </div>
        <div className="about-section__content">
          <p className="section-header__subtitle">About AeroTech</p>
          <h2 className="about-section__title">
            A single source for rental equipment and industrial supply
          </h2>
          <p className="about-section__desc">
            AeroTech Infra Equipment Private Limited combines a dependable rental fleet with a stocked hardware and industrial products counter, serving contractors, factories and individual customers from our base in Sriperumbudur.
          </p>
          <div className="about-section__stats">
            {stats.map((s) => (
              <div key={s.label} className="about-section__stat">
                <p className="about-section__stat-value">{s.value}</p>
                <p className="about-section__stat-label">{s.label}</p>
              </div>
            ))}
          </div>
          <Button variant="dark" to="/about">Learn More About Us</Button>
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
