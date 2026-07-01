// Direct WhatsApp deep link (wa.me) — no gateway/API key needed.
// Opens the user's WhatsApp (app or web) with a prefilled message,
// addressed to LERA's target phone number.

// Configurable via env so the number can be changed without a code change.
// Falls back to the number already used elsewhere in the site (Contact/Drop pages).
export const LERA_WHATSAPP_NUMBER =
  (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) || "6281234567890";

export function buildWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Reserve a blank browser tab synchronously — call this at the very start
 * of a click handler, BEFORE any `await`. Browsers block `window.open()`
 * calls that happen after an async gap, so we open a blank tab immediately
 * and only set its destination once the async work (e.g. saving to
 * Firestore) finishes. This keeps the WhatsApp redirect reliable.
 */
export function reserveWhatsAppWindow(): Window | null {
  return window.open("", "_blank");
}

/** Points an already-reserved window at the WhatsApp deep link (or opens a new one as a fallback). */
export function openWhatsApp(win: Window | null, phone: string, message: string) {
  const link = buildWhatsAppLink(phone, message);
  if (win) {
    win.location.href = link;
  } else {
    window.open(link, "_blank");
  }
}
