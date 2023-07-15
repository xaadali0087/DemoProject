import apiClient from "@/utils/apiClient";

// ** Types
import { DataParams } from "@/types/product";

// ** Function
const getProductsList = async (params: DataParams) => {
  const { page, limit, ...rest } = params;

  for (const [key, value] of Object.entries(rest)) {
    if (["", null, undefined].includes(value)) {
      delete rest[key];
    }
  }
  const response = await apiClient.get("api/v1/products", {
    params: { page, limit, ...rest },
  });
  return response.data;
};

const getSingleProductDetail = async (data: any) => {
  const { slug, aliasId } = data;
  const response = await apiClient.get(`api/v1/products/${slug}/${aliasId}`);
  return response.data;
};

const getCategory = async () => {
  const response = await apiClient.get(`api/v1/categories`);
  return response.data.data;
};

const getSubCategory = async (id: number) => {
  const response = await apiClient.get(`api/v1/categories/${id}/subcategories`);
  return response.data;
};

export { getProductsList, getSingleProductDetail, getCategory, getSubCategory };
