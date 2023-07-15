export interface DataParams {
  limit?: number;
  page?: number;
  category?: string | undefined;
  [key: string]: any;
}

export interface SingleProductType {
  id: number;
  title: string;
  price: string;
  aliasId: string;
  slug: string;
  description: string;
  stock: number;
  images: { url: string; isThumbnail: boolean }[];
  qty: number;
  isFavorite: boolean;
}

export interface SingleCategoryType {
  id: number;
  title: string;
  iconUrl: string;
  isActive: boolean;
}

export enum FavoriteProductStatus {
  added = "added",
  removed = "removed",
}

export interface shippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  landMark: string;
  city: string;
  country: string;
  zipCode: string;
  note: string;
}
