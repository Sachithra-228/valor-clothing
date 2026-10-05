// Contact details and social profiles shown across the site.
export const WHATSAPP_DISPLAY = "070 731 3840";
// wa.me needs the number in international format, without "+" or the leading 0.
const WHATSAPP_NUMBER = "94707313840";

export const socialLinks = {
  instagram: "https://www.instagram.com/valorclothing.lk",
  tiktok: "https://www.tiktok.com/@valorclothing.lk",
  facebook: "https://www.facebook.com/share/1Y4LduPKT9/",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`
};

// Link that opens a WhatsApp chat with VALOR, with the message already typed in.
export function whatsappUrl(message: string) {
  return `${socialLinks.whatsapp}?text=${encodeURIComponent(message)}`;
}
