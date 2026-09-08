export type ServiceDataType = {
  title: string;
  price: string;
  duration: number;
  category: "exterior" | "interior" | "polishing" | "package";
  services: string[];
  extraSuv: string;
  extraTransporter: string;
  info: string;
  hasDiscount: boolean;
  discount: string;
  isFeatured: boolean;
  keywords: string[];
};

export type ReviewType = {
  starCount: number;
  name: string;
  surname: string;
  review: string;
  approvedBy: string | null;
};
