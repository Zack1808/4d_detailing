type Category = "exterior" | "interior" | "polishing" | "package";

type LowestPriceData = {
  date: string;
  priceFrom: number;
};

type PriceType = {
  ref: number;
  current: number;
};

export type ServiceType = {
  id: string;
  slug: string;
  title: string;
  priceFrom: PriceType;
  priceTo?: PriceType;
  duration: string;
  category: Category;
  services: string[];
  suv: PriceType;
  transporter: PriceType;
  remark?: string;
  discount: {
    isEnabled: boolean;
    type: "percentage" | "fixed";
    value: number;
    lowest: LowestPriceData[];
  };
  isFeatured: boolean;
  keywords?: string[];
  description: string;
};

export type NewServiceType = Omit<ServiceType, "id">;

export type ReviewType = {
  id: string;
  starCount: number;
  name: string;
  surname: string;
  review: string;
  isApproved: boolean;
};

export type NewReviewType = Omit<ReviewType, "id" | "isApproved">;
