export type ServiceDataType = {
  title: string;
  price: string;
  services: string[];
  extraSuv?: string;
  extraTransporter?: string;
  info?: string;
  hasDiscount: boolean;
  discount?: string;
};

export type ReviewType = {
  starCount: number;
  name: string;
  surname: string;
  review: string;
};
