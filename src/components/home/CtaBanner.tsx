import Button from "../ui/Button";

const CtaBanner = () => {
  return (
    <section className="cta-banner">
      <div className="container cta-banner__inner">
        <div className="cta-banner__text">
          <h2>Need equipment on site, fast?</h2>
          <p>Call 97918 90636 or send us a message — we respond quickly.</p>
        </div>
        <div className="cta-banner__actions">
          <Button variant="dark" href="tel:+919791890636">Call Now</Button>
          <Button variant="outline-dark" to="/contact">Contact Us</Button>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
