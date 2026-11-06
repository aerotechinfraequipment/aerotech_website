export const WHATSAPP_NUMBER = "919791890636";

export type EnquiryType = "rental" | "product" | "steel" | "contact";

export type EnquiryInput = {
  type: EnquiryType;
  name: string;
  phone: string;
  company?: string;
  email?: string;
  item_name?: string;
  item_id?: string | null;
  rental_type?: string;
  quantity?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  location?: string;
  message?: string;
  source_page?: string;
  turnstileToken: string;
};

export function openWhatsApp(text: string) {
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener,noreferrer",
  );
}

export async function submitEnquiry(input: EnquiryInput): Promise<string> {
  const base = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!base || !key) {
    throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
  }

  const response = await fetch(`${base}/functions/v1/submit-enquiry`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: key,
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(input),
  });

  let body: { id?: string; error?: string } = {};
  try {
    body = await response.json();
  } catch {
    body = {};
  }
  if (!response.ok || !body.id) {
    throw new Error(body.error || "Could not save enquiry");
  }
  return body.id;
}
