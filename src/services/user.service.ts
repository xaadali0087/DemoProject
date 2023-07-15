import apiClient from "@/utils/apiClient";

const userRegister = async (data: any) => {
  return await apiClient.post("api/v1/auth/register", data);
};

const userLogin = async (data: any) => {
  return await apiClient.post("api/v1/auth/login", data);
};

const userLogout = async () => {
  return await apiClient.post("api/v1/auth/logout");
};

const forgotPassword = async (data: any) => {
  return await apiClient.post("api/v1/auth/forgot-password", data);
};

const resetPassword = async (data: any) => {
  return await apiClient.post("api/v1/auth/reset-password", data);
};

const getSingleUserDetail = async () => {
  const response = await apiClient.get("api/v1/users/me/profile");
  return response.data;
};

const changePassword = async (data: any) => {
  return await apiClient.post("api/v1/auth/change-password", data);
};

const updateUserProfile = async (data: any) => {
  return await apiClient.patch("api/v1/users/me/profile", data);
};

export {
  userRegister,
  userLogin,
  userLogout,
  forgotPassword,
  resetPassword,
  changePassword,
  getSingleUserDetail,
  updateUserProfile,
};
