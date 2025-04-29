export type OrderIn = {
  id: number;
  full_name: string;
  wilaya: string;
  phone_number: string;
  baladiya: string;
  time: string;
  date: string;
  home_dilvery: boolean;
  status: Exclude<OrderStatus, "all">;
};

export type OrderOut = {
  full_name: string;
  wilaya_id: number;
  phone_number: string;
  baladiya_id: number;
  home_dilvery: boolean;
};

export type OrderTableProps = {
  ordersList: OrderIn[];
  ordersCount: number;
};

export type OrderStatus =
  | "all"
  | "pending"
  | "confirmed"
  | "shipped"
  | "recived"
  | "canceled"
  | "returned"
  | "notresponding";

export type Product = {
  title: string;
  price: number;
  prev_price: number;
  buying_price: number;
  global_stock: number;
  category_id: number;
  description: string;
  free_shipping: boolean;
  active: boolean;
  out_stock_sell: boolean;
  has_option: boolean;
};

export type OptionItem = {
  id: string;
  key: string;
  value: string;
};

export type ProductOption = {
  id: string;
  name: string;
  is_custom: boolean;
  items: OptionItem[];
};

export type Category = {
  id: number;
  name: string;
};

export type Wilaya = {
  [index: string]: string | number | boolean | undefined;
  id: number;
  name: string;
  wilaya_code: string;
  desk_price?: number;
  home_price?: number;
  active?: boolean;
};

export type Baladiya = {
  id: number;
  name: string;
};

export type ToastMsg = {
  msg: string;
  type: "done" | "error";
};

export type Images = {
  id: string;
  image: File;
};

export type Media = {
  id: string;
  file_name: string;
  file_extenstion: string;
  url: string;
  type: "image" | "video";
};

export type ImagesPosition = {
  imageID: string;
  x: number;
  y: number;
};

export type Variant = {
  name: string;
  media_id: string;
  stock: number;
  price: number;
};
