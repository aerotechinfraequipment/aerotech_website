import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/Button";
import ContactForm from "../components/forms/ContactForm";
import QuoteForm from "../components/forms/QuoteForm";

const Contact = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <SectionHeader
            subtitle="Contact"
            title="Talk to our team"
            description="Rental quote, product enquiry or a visit to our counter — reach us whichever way suits you."
            theme="dark"
          />
        </div>
      </section>

      {/* Contact Body */}
      <section className="contact-body">
        <div className="container contact-body__grid">
          {/* Left Sidebar */}
          <div className="contact-sidebar">
            <div className="contact-info-card">
              <h2>Phone &amp; WhatsApp</h2>
              <p>97918 90636</p>
              <div className="contact-info-card__actions">
                <Button href="tel:+919791890636" variant="dark">Call Now</Button>
                <Button
                  href="https://wa.me/919791890636?text=Hello%20AeroTech%2C%20I%20have%20an%20enquiry."
                  variant="whatsapp"
                  external
                >
                  WhatsApp Us
                </Button>
              </div>
            </div>

            <div className="contact-info-card">
              <h2>Email</h2>
              <a href="mailto:aerotech2003@gmail.com" className="contact-info-card__link">
                aerotech2003@gmail.com
              </a>
            </div>

            <div className="contact-info-card">
              <h2>Office</h2>
              <p className="contact-info-card__text">
                SF No.135/4G2, Chennai Salai, Thirumangalam, Sriperumbudur, Kanchipuram (D.T) – 602 106, Tamil Nadu
              </p>
              <p className="contact-info-card__text--small">
                GSTIN: 33ABFCA6529D1ZY
              </p>
            </div>

            <div className="contact-info-card">
              <h2>Service Areas</h2>
              <p className="contact-info-card__text">
                Chennai · Kanchipuram · Sriperumbudur · Oragadam · Ranipet · Vellore · Chengalpattu · Tamil Nadu
              </p>
            </div>
          </div>

          {/* Right Forms */}
          <div className="contact-forms">
            <div className="contact-form-panel">
              <div className="contact-form-panel__header">
                <h2>Send us a message</h2>
                <p>General enquiries, product questions or anything else.</p>
              </div>
              <ContactForm />
            </div>

            <div className="contact-form-panel" id="quote">
              <div className="contact-form-panel__header">
                <h2>Request a rental quote</h2>
                <p>Tell us what equipment you need and when.</p>
              </div>
              <QuoteForm />
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="container">
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps?q=Sriperumbudur%2C%20Kanchipuram%2C%20Tamil%20Nadu%20602106&output=embed"
              title="AeroTech Infra Equipment location map — Sriperumbudur"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
