import apiClient from "@/utils/apiClient";

const getFavouritesProductList = async () => {
  const response = await apiClient.get("api/v1/users/me/favorite-products");
  return response.data;
};

const addProductToFavorite = async (id: number) => {
  const response = await apiClient.post(
    `api/v1/products/${id}/add-or-remove-product-from-favorite-list`
  );
  return response.data;
};
export { getFavouritesProductList, addProductToFavorite };
