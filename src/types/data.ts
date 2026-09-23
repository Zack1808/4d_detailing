type Category = "exterior" | "interior" | "polishing" | "package";

export type ServiceDataType = {
  id: string;
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
  dateFrom?: string;
  dateTo?: string;
  remark?: string;
  isConfirmed: boolean;
  isBlocked: boolean;
};
