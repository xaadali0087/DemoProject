import apiClient from "@/utils/apiClient";

const placeOrder = async (data: any) => {
  const response = await apiClient.post("api/v1/orders", data);
  return response.data;
};

const getOrderList = async () => {
  const response = await apiClient.get("api/v1/orders");
  return response.data;
};

const getWalletAddressAndQR = async () => {
  const response = await apiClient.get("api/v1/users/me/wallet-in-text-and-qr");
  return response.data;
};
export { placeOrder, getOrderList, getWalletAddressAndQR };
