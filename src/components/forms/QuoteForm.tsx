import { useState } from "react";
import Button from "../ui/Button";

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    equipment: "",
    rentalType: "daily",
    startDate: "",
    endDate: "",
    location: "",
    quantity: "1",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName || !trimmedPhone || !formData.equipment) {
      setErrorMessage("Please fill in required fields (Name, Phone, and Equipment).");
      setStatus("error");
      return;
    }

    const phoneRegex = /^[\d\s+\-()]{7,20}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      setErrorMessage("Please enter a valid phone number.");
      setStatus("error");
      return;
    }

    if (trimmedEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        setErrorMessage("Please enter a valid email address.");
        setStatus("error");
        return;
      }
    }

    const lines = [
      "Hello AeroTech, I would like to request a Rental Quote:",
      `*Name:* ${trimmedName}`,
      formData.company.trim() ? `*Company:* ${formData.company.trim()}` : "",
      `*Phone:* ${trimmedPhone}`,
      trimmedEmail ? `*Email:* ${trimmedEmail}` : "",
      `*Equipment:* ${formData.equipment}`,
      `*Rental Plan:* ${formData.rentalType}`,
      formData.quantity ? `*Quantity:* ${formData.quantity}` : "",
      formData.startDate ? `*Start Date:* ${formData.startDate}` : "",
      formData.endDate ? `*End Date:* ${formData.endDate}` : "",
      formData.location.trim() ? `*Location:* ${formData.location.trim()}` : "",
      formData.message.trim() ? `*Requirements:* ${formData.message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setStatus("success");
    window.open(
      `https://wa.me/919791890636?text=${encodeURIComponent(lines)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <form className="quote-form" onSubmit={handleSubmit} noValidate>
      {status === "success" && (
        <div
          style={{
            padding: "0.85rem 1rem",
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid #10b981",
            borderRadius: "0.375rem",
            color: "#10b981",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          ✓ Quote request prepared! Opening WhatsApp to share with our rental desk.
        </div>
      )}

      {status === "error" && errorMessage && (
        <div
          style={{
            padding: "0.85rem 1rem",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid #ef4444",
            borderRadius: "0.375rem",
            color: "#ef4444",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          {errorMessage}
        </div>
      )}

      <div className="quote-form__row">
        <div className="quote-form__field">
          <label htmlFor="q-name">Name *</label>
          <input
            id="q-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={100}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div className="quote-form__field">
          <label htmlFor="q-company">Company Name</label>
          <input
            id="q-company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            maxLength={100}
            placeholder="Company (optional)"
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="quote-form__row">
        <div className="quote-form__field">
          <label htmlFor="q-phone">Phone *</label>
          <input
            id="q-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            maxLength={20}
            placeholder="97918 90636"
            autoComplete="tel"
          />
        </div>
        <div className="quote-form__field">
          <label htmlFor="q-email">Email</label>
          <input
            id="q-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            maxLength={255}
            placeholder="you@company.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="quote-form__row">
        <div className="quote-form__field">
          <label htmlFor="q-equipment">Equipment *</label>
          <select
            id="q-equipment"
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select equipment</option>
            <option value="Boom Lift">Boom Lift (Telescopic / Articulating)</option>
            <option value="Scissor Lift">Rough Terrain Scissor Lift</option>
            <option value="Excavator">Excavator</option>
            <option value="All-Terrain Crane">SANY All-Terrain Crane</option>
            <option value="Truck Crane">Truck Crane</option>
          </select>
        </div>
        <div className="quote-form__field">
          <label htmlFor="q-rentalType">Rental Type *</label>
          <select
            id="q-rentalType"
            name="rentalType"
            value={formData.rentalType}
            onChange={handleChange}
            required
          >
            <option value="daily">Daily Rental</option>
            <option value="weekly">Weekly Rental</option>
            <option value="monthly">Monthly Rental</option>
          </select>
        </div>
      </div>

      <div className="quote-form__row">
        <div className="quote-form__field">
          <label htmlFor="q-start">Start Date</label>
          <input
            id="q-start"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="quote-form__field">
          <label htmlFor="q-end">End Date</label>
          <input
            id="q-end"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="quote-form__row">
        <div className="quote-form__field">
          <label htmlFor="q-location">Project Location</label>
          <input
            id="q-location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            maxLength={150}
            placeholder="Site location in Tamil Nadu"
          />
        </div>
        <div className="quote-form__field">
          <label htmlFor="q-quantity">Quantity</label>
          <input
            id="q-quantity"
            name="quantity"
            type="number"
            min={1}
            max={99}
            value={formData.quantity}
            onChange={handleChange}
            placeholder="1"
          />
        </div>
      </div>

      <div className="quote-form__field quote-form__field--full">
        <label htmlFor="q-message">Message</label>
        <textarea
          id="q-message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          maxLength={1000}
          placeholder="Tell us about your project requirements (reach height, terrain, load capacity)"
        />
      </div>

      <div className="quote-form__field quote-form__field--full">
        <Button type="submit" variant="accent">Request Rental Quote via WhatsApp</Button>
      </div>
    </form>
  );
};

export default QuoteForm;
