import { useState } from "react";
import Button from "../ui/Button";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedPhone || !trimmedMessage) {
      setErrorMessage("Please fill in all required fields (Name, Phone, and Message).");
      setStatus("error");
      return;
    }

    // Basic phone validation (digits, optional +, space, hyphen)
    const phoneRegex = /^[\d\s+\-()]{7,20}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      setErrorMessage("Please enter a valid contact phone number.");
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

    // Safely trigger WhatsApp enquiry without leaking PII in URL parameters
    const text = encodeURIComponent(
      `Hello AeroTech,\n*Name:* ${trimmedName}\n*Phone:* ${trimmedPhone}${
        trimmedEmail ? `\n*Email:* ${trimmedEmail}` : ""
      }${
        formData.subject.trim() ? `\n*Subject:* ${formData.subject.trim()}` : ""
      }\n*Message:* ${trimmedMessage}`
    );

    setStatus("success");
    window.open(`https://wa.me/919791890636?text=${text}`, "_blank", "noopener,noreferrer");
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
          ✓ Thank you! Opening WhatsApp to send your enquiry directly to our team.
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
          <label htmlFor="c-name">Name *</label>
          <input
            id="c-name"
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
          <label htmlFor="c-phone">Phone *</label>
          <input
            id="c-phone"
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
      </div>

      <div className="quote-form__row">
        <div className="quote-form__field">
          <label htmlFor="c-email">Email</label>
          <input
            id="c-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            maxLength={255}
            placeholder="you@company.com"
            autoComplete="email"
          />
        </div>
        <div className="quote-form__field">
          <label htmlFor="c-subject">Subject</label>
          <input
            id="c-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            maxLength={150}
            placeholder="Equipment rental / Product enquiry"
          />
        </div>
      </div>

      <div className="quote-form__field quote-form__field--full">
        <label htmlFor="c-message">Message *</label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          maxLength={1000}
          placeholder="How can we help?"
        />
      </div>

      <div className="quote-form__field quote-form__field--full">
        <Button type="submit" variant="accent">
          Send Message via WhatsApp
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
