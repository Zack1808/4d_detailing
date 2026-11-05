export const SITE_URL = "https://4d-detailing.hr";

export const BUSINESS = {
  name: "4D Detailing",
  owner: "Luka Novak",
  oib: "17787878930",
  email: "info@4d-detailing.hr",
  phone: {
    display: "+385 97 758 8716",
    href: "tel:+385977588716",
    schema: "+385-97-758-8716",
    whatsapp: "385977588716",
  },
  address: {
    street: "Rakitovec 274",
    postalCode: "10410",
    city: "Velika Gorica",
    full: "Rakitovec 274, 10410 Velika Gorica",
  },
  mapsUrl: "https://maps.app.goo.gl/BM2TStTNWFyDirfr9",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788.767048363273!2d16.138965799999994!3d45.6554997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476687ea7e828591%3A0xf8f5db96b6352889!2sRakitovec%20274%2C%2010419%2C%20Rakitovec!5e0!3m2!1sen!2shr!4v1789139385570!5m2!1sen!2shr",
  tagline: "Luksuz koji si možete priuštiti",
  founderCaption: "Luka Novak - Osnivač 4D Detailinga",
} as const;

export type SocialId =
  | "tiktok"
  | "instagram"
  | "facebook"
  | "whatsapp"
  | "youtube";

export const SOCIAL_LINKS: { id: SocialId; label: string; href: string }[] = [
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@4ddetailing?_t=ZN-8sUT8kPvC5e&_r=1",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/4dcardetailing?igsh=MTAzYnVsa2U0bmY5MA==",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/p/4D-Detailing-61573426065582/",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: `https://wa.me/${BUSINESS.phone.whatsapp}`,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@4DDetailing",
  },
];
