type Category = "exterior" | "interior" | "polishing" | "package";

type LowestPriceData = {
  date: string;
  priceFrom: number;
};

type PriceType = {
  ref: number;
  current: number;
};

export type ServiceDataType = {
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

export type ReviewType = {
  id: string;
  starCount: number;
  name: string;
  surname: string;
  review: string;
  isApproved: boolean;
};

export type AppointmentType = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  vehicle: string;
  dateFrom: string;
  dateTo?: string;
  remark?: string;
  isConfirmed: boolean;
  isBlocked: boolean;
};

export type AdminUserType = {
  uid: string;
  email: string;
};
