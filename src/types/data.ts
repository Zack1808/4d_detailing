type Category = "exterior" | "interior" | "polishing" | "package";

export type ServiceDataType = {
  slug: string;
  title: string;
  priceFrom: number;
  priceTo?: number;
  duration: string;
  category: Category;
  services: string[];
  suv?: number;
  transporter?: number;
  remark?: string;
  discount?: {
    type: "percentage" | "fixed";
    value: number;
  };
  isFeatured: boolean;
  keywords?: string[];
  description: string;
};

export type ReviewType = {
  starCount: number;
  name: string;
  surname: string;
  review: string;
  isApproved: boolean;
};
