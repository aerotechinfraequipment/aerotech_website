import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../ui/Button";
import TurnstileField from "./TurnstileField";
import { openWhatsApp, submitEnquiry, type EnquiryType } from "../../lib/enquiry";

type ButtonVariant = "accent" | "dark" | "outline" | "outline-dark" | "whatsapp" | "ghost";

type ItemEnquiryProps = {
  type: Extract<EnquiryType, "product" | "steel">;
  itemId: string;
  itemName: string;
  whatsappText: string;
  label: string;
  variant?: ButtonVariant;
};

const PHONE = /^[\d\s+\-()]{7,20}$/;

const ItemEnquiry = ({
  type,
  itemId,
  itemName,
  whatsappText,
  label,
  variant = "accent",
}: ItemEnquiryProps) => {
  const location = useLocation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [widgetKey, setWidgetKey] = useState(0);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => {
    setOpen(false);
    setErrorMessage("");
    setSending(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setErrorMessage("");

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedName || !trimmedPhone) {
      setErrorMessage("Please fill in your name and phone.");
      return;
    }
    if (!PHONE.test(trimmedPhone)) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }
    if (!token) {
      setErrorMessage("Complete the check before sending.");
      return;
    }

    setSending(true);
    try {
      await submitEnquiry({
        type,
        name: trimmedName,
        phone: trimmedPhone,
        item_id: itemId,
        item_name: itemName,
        message: message.trim(),
        source_page: location.pathname,
        turnstileToken: token,
      });
      setName("");
      setPhone("");
      setMessage("");
      setToken("");
      setOpen(false);
      openWhatsApp(whatsappText);
    } catch (error) {
      setToken("");
      setWidgetKey((key) => key + 1);
      setErrorMessage(error instanceof Error ? error.message : "Could not save enquiry");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Button variant={variant} onClick={() => setOpen(true)}>
        {label}
      </Button>
      <dialog ref={dialogRef} className="enquiry-dialog" onClose={close}>
        <div className="enquiry-dialog__head">
          <h2>Enquire about {itemName}</h2>
          <button type="button" className="enquiry-dialog__close" onClick={close} aria-label="Close">
            ×
          </button>
        </div>
        <form className="quote-form" onSubmit={handleSubmit} noValidate>
          {errorMessage && (
            <div className="form-alert form-alert--error">{errorMessage}</div>
          )}
          <div className="quote-form__field">
            <label htmlFor={`${type}-${itemId}-name`}>Name *</label>
            <input
              id={`${type}-${itemId}-name`}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={120}
              autoComplete="name"
            />
          </div>
          <div className="quote-form__field">
            <label htmlFor={`${type}-${itemId}-phone`}>Phone *</label>
            <input
              id={`${type}-${itemId}-phone`}
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
              maxLength={30}
              autoComplete="tel"
            />
          </div>
          <div className="quote-form__field">
            <label htmlFor={`${type}-${itemId}-message`}>Message</label>
            <textarea
              id={`${type}-${itemId}-message`}
              rows={3}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={1000}
            />
          </div>
          {open && <TurnstileField key={widgetKey} onToken={setToken} />}
          <Button type="submit" variant="accent" disabled={sending}>
            {sending ? "Sending…" : "Send enquiry"}
          </Button>
        </form>
      </dialog>
    </>
  );
};

export default ItemEnquiry;
