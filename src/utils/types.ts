type CustomerType = {
  id: string;
  name: string;
  level: string;
  shipping_zone: string;
  currency: string;
};

type OrderType = {
  id: string;
  customer_id: string;
  product_id: string;
  qty: number;
  unit_price: number;
  date: string;
  promo_code: any;
  time: string;
};

type ProductType = {
  id: string;
  name: string;
  category: string;
  price: number;
  weight: number;
  taxable: boolean;
};

type ShippingZoneType = {
  zone: string;
  base: number;
  per_kg: number;
};

type PromotionType = {
  code: string;
  type: string;
  value: string;
  active: boolean;
};

export {
  CustomerType,
  OrderType,
  ProductType,
  ShippingZoneType,
  PromotionType,
};
