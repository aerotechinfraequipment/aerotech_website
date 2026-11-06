import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../ui/Button";
import TurnstileField from "./TurnstileField";
import { openWhatsApp, submitEnquiry } from "../../lib/enquiry";

const ContactForm = () => {
  const location = useLocation();
  const [token, setToken] = useState("");
  const [widgetKey, setWidgetKey] = useState(0);
  const [sending, setSending] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
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

    if (!token) {
      setErrorMessage("Complete the check before sending.");
      setStatus("error");
      return;
    }

    const text = `Hello AeroTech,\n*Name:* ${trimmedName}\n*Phone:* ${trimmedPhone}${
      trimmedEmail ? `\n*Email:* ${trimmedEmail}` : ""
    }${
      formData.subject.trim() ? `\n*Subject:* ${formData.subject.trim()}` : ""
    }\n*Message:* ${trimmedMessage}`;

    setSending(true);
    try {
      await submitEnquiry({
        type: "contact",
        name: trimmedName,
        phone: trimmedPhone,
        email: trimmedEmail,
        item_name: formData.subject.trim(),
        message: trimmedMessage,
        source_page: location.pathname,
        turnstileToken: token,
      });
      setStatus("success");
      setToken("");
      setWidgetKey((key) => key + 1);
      openWhatsApp(text);
    } catch (error) {
      setToken("");
      setWidgetKey((key) => key + 1);
      setErrorMessage(error instanceof Error ? error.message : "Could not save enquiry");
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="quote-form" onSubmit={handleSubmit} noValidate>
      {status === "success" && (
        <div className="form-alert form-alert--success">
          Enquiry saved. Opening WhatsApp to send it to our team.
        </div>
      )}

      {status === "error" && errorMessage && (
        <div className="form-alert form-alert--error">{errorMessage}</div>
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

      <TurnstileField key={widgetKey} onToken={setToken} />

      <div className="quote-form__field quote-form__field--full">
        <Button type="submit" variant="accent" disabled={sending}>
          {sending ? "Sending…" : "Send Message via WhatsApp"}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
