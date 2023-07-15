interface ItemsType {
  productTitle: string;
  productPrice: string;
  quantity: number;
}

export interface OrderListType {
  id: number;
  createdAt: string;
  orderNo: string;
  paymentStatus: string;
  status: string;
  items: ItemsType[];
  shippingDetails: { address: string };
  user: { fullName: string };
}
