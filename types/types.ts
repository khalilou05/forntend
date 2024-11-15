export type Order = {
  id: number;
  full_name: string;
  wilaya: string;
  phone_number: string;
  baladiya: string;
  time: string;
  date: string;
  home_dilvery: boolean;
  status: string;
};

export type OrderTableProps = {
  data: Order[];
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

export type OrderFilterInput = {
  setOrders: (orders: Order[]) => void;
  orderStatus: string;
  orderLength: number;
};

export type Product = {
  [index: string]: string | number | boolean;
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

export type OptionItems = {
  id: string | number;
  item_name: string;
  price: number;
  stock: number;
};

export type ProductOption = {
  id: string | number;
  name: string;
  items: OptionItems[];
};

export type Category = {
  id: number;
  name: string;
};

export type WilayaData = {
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

export type ImagesPosition = {
  imageID: string;
  x: number;
  y: number;
};
