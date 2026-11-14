import contact from "../data/contact.json";

export const SITE = {
  phoneDisplay: contact.phoneDisplay,
  phoneTel: contact.phoneTel,
  phoneWhatsApp: contact.phoneWhatsApp,
  email: contact.email,
  address: contact.address,
  gstin: contact.gstin,
  serviceAreas: contact.serviceAreas,
} as const;

export const telHref = `tel:${SITE.phoneTel}`;
export const mailHref = `mailto:${SITE.email}`;

export function whatsappHref(text?: string) {
  const base = `https://wa.me/${SITE.phoneWhatsApp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
