import Button from "../ui/Button";

const ContactForm = () => {
  return (
    <form className="quote-form" noValidate>
      <div className="quote-form__row">
        <div className="quote-form__field">
          <label htmlFor="c-name">Name *</label>
          <input id="c-name" name="name" required maxLength={100} placeholder="Your name" />
        </div>
        <div className="quote-form__field">
          <label htmlFor="c-phone">Phone *</label>
          <input id="c-phone" name="phone" type="tel" required placeholder="97918 90636" />
        </div>
      </div>
      
      <div className="quote-form__row">
        <div className="quote-form__field">
          <label htmlFor="c-email">Email *</label>
          <input id="c-email" name="email" type="email" required maxLength={255} placeholder="you@company.com" />
        </div>
        <div className="quote-form__field">
          <label htmlFor="c-subject">Subject</label>
          <input id="c-subject" name="subject" maxLength={150} placeholder="Equipment rental / Product enquiry" />
        </div>
      </div>
      
      <div className="quote-form__field quote-form__field--full">
        <label htmlFor="c-message">Message *</label>
        <textarea id="c-message" name="message" rows={5} required maxLength={1000} placeholder="How can we help?" />
      </div>
      
      <div className="quote-form__field quote-form__field--full">
        <Button type="submit" variant="accent">Send Message</Button>
      </div>
    </form>
  );
};

export default ContactForm;
