import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/Button";

// Images
import companyImg from "../assets/company.jpg";
import teamImg from "../assets/about-team.jpg";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <SectionHeader
            subtitle="About Us"
            title="Equipment and supply, under one roof"
            description="AeroTech Infra Equipment Private Limited brings together two essentials for any project — dependable rental machinery and a complete industrial products counter."
            theme="dark"
          />
        </div>
      </section>

      {/* Who We Are */}
      <section className="about-who">
        <div className="container about-who__grid">
          <div className="about-who__content">
            <h2>Who we are</h2>
            <p>
              Based in Sriperumbudur, Kanchipuram district, AeroTech Infra
              Equipment Private Limited serves contractors, factories,
              engineering firms and individual customers across Tamil Nadu. Our
              rental division keeps a fleet of access, lifting and earthmoving
              equipment ready for daily and monthly hire, while our products
              division stocks pneumatics, power tools, welding equipment,
              valves, measuring instruments and industrial accessories from
              leading brands.
            </p>
            <p>
              Whether you are a project manager planning a large site or a
              walk-in customer looking for a single tool, you get the same
              straightforward service and genuine products.
            </p>
          </div>
          <div className="about-who__image">
            <img
              src={companyImg}
              alt="AeroTech equipment yard in Sriperumbudur"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="about-values">
        <div className="container">
          <SectionHeader
            subtitle="Our Values"
            title="How we work"
            description="Four principles guide every rental and every sale."
          />
          <div className="about-values__grid">
            <div className="value-card">
              <span className="value-card__num">01</span>
              <h3 className="value-card__title">Reliability</h3>
              <p className="value-card__desc">
                Machines that work when you need them, products that perform as promised.
              </p>
            </div>
            <div className="value-card">
              <span className="value-card__num">02</span>
              <h3 className="value-card__title">Safety</h3>
              <p className="value-card__desc">
                Inspected equipment and genuine products — because your team's safety is non-negotiable.
              </p>
            </div>
            <div className="value-card">
              <span className="value-card__num">03</span>
              <h3 className="value-card__title">Fair Pricing</h3>
              <p className="value-card__desc">
                Transparent rental terms and honest product pricing for every customer.
              </p>
            </div>
            <div className="value-card">
              <span className="value-card__num">04</span>
              <h3 className="value-card__title">Service</h3>
              <p className="value-card__desc">
                Responsive support by phone, WhatsApp and in person at our Sriperumbudur office.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="about-visit">
        <div className="container about-visit__grid">
          <div className="about-visit__image">
            <img
              src={teamImg}
              alt="The AeroTech team at work"
              loading="lazy"
            />
          </div>
          <div className="about-visit__content">
            <h2>Visit us or get in touch</h2>
            <p>
              SF No.135/4G2, Chennai Salai, Thirumangalam, Sriperumbudur, Kanchipuram (D.T) – 602 106, Tamil Nadu
            </p>
            <p>
              Phone &amp; WhatsApp:{" "}
              <a href="tel:+919791890636" className="font-bold">
                97918 90636
              </a>
              <br />
              Email:{" "}
              <a href="mailto:aerotech2003@gmail.com" className="font-bold">
                aerotech2003@gmail.com
              </a>
            </p>
            <Button to="/contact" variant="accent">Contact Us</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;