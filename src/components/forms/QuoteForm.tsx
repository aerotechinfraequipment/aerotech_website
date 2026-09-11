import Button from "../ui/Button";

const QuoteForm = () => {
  return (
    <form className="quote-form" noValidate>
      <div className="quote-form__row">
        <div className="quote-form__field">
          <label htmlFor="q-name">Name *</label>
          <input id="q-name" name="name" required maxLength={100} placeholder="Your name" />
        </div>
        <div className="quote-form__field">
          <label htmlFor="q-company">Company Name</label>
          <input id="q-company" name="company" maxLength={100} placeholder="Company (optional)" />
        </div>
      </div>
      
      <div className="quote-form__row">
        <div className="quote-form__field">
          <label htmlFor="q-phone">Phone *</label>
          <input id="q-phone" name="phone" type="tel" required placeholder="97918 90636" />
        </div>
        <div className="quote-form__field">
          <label htmlFor="q-email">Email</label>
          <input id="q-email" name="email" type="email" maxLength={255} placeholder="you@company.com" />
        </div>
      </div>
      
      <div className="quote-form__row">
        <div className="quote-form__field">
          <label htmlFor="q-equipment">Equipment *</label>
          <select id="q-equipment" name="equipment" required defaultValue="">
            <option value="" disabled>Select equipment</option>
            <option value="Boom Lift">Boom Lift</option>
            <option value="Articulating Boom Lift">Articulating Boom Lift</option>
            <option value="Scissor Lift">Scissor Lift</option>
            <option value="Excavator">Excavator</option>
            <option value="SANY Crane">SANY Crane</option>
          </select>
        </div>
        <div className="quote-form__field">
          <label htmlFor="q-rentalType">Rental Type *</label>
          <select id="q-rentalType" name="rentalType" required defaultValue="daily">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      
      <div className="quote-form__row">
        <div className="quote-form__field">
          <label htmlFor="q-start">Start Date</label>
          <input id="q-start" name="startDate" type="date" />
        </div>
        <div className="quote-form__field">
          <label htmlFor="q-end">End Date</label>
          <input id="q-end" name="endDate" type="date" />
        </div>
      </div>
      
      <div className="quote-form__row">
        <div className="quote-form__field">
          <label htmlFor="q-location">Project Location</label>
          <input id="q-location" name="location" maxLength={150} placeholder="Site location" />
        </div>
        <div className="quote-form__field">
          <label htmlFor="q-quantity">Quantity</label>
          <input id="q-quantity" name="quantity" type="number" min={1} max={99} placeholder="1" />
        </div>
      </div>
      
      <div className="quote-form__field quote-form__field--full">
        <label htmlFor="q-message">Message</label>
        <textarea id="q-message" name="message" rows={4} maxLength={1000} placeholder="Tell us about your project requirements" />
      </div>
      
      <div className="quote-form__field quote-form__field--full">
        <Button type="submit" variant="accent">Request Rental Quote</Button>
      </div>
    </form>
  );
};

export default QuoteForm;
