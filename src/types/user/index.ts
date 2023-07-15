export type UserType = {
  id: number | null;
  fullName: string;
  email: string;
  phoneNo: string;
  location: string;
};
export type UserInitialStateType = {
  accessToken: string | null;
  forgotEmail: string | null;
  verifyCode: number | null;
  user: {
    id: number | null;
    email: string;
    fullName: string;
  };
};

export type DataParams = Omit<UserType, "phoneNo" | "location">;
