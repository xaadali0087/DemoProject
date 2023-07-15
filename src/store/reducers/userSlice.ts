// ** Redux Toolkit

import { createSlice } from "@reduxjs/toolkit";

// **  Type
import { DataParams, UserInitialStateType } from "@/types/user";

// ** Deafaul Param
export const DEFAULT_USER_PARAMS: DataParams = {
  id: null,
  fullName: "",
  email: "",
};

// ** InitialState
const initialState: UserInitialStateType = {
  accessToken: null,
  user: {
    id: null,
    email: "",
    fullName: "",
  },
  forgotEmail: null,
  verifyCode: null,
};

// ** Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    saveUserData: (state, action) => {
      state.user = action.payload;
    },
    saveForgotEmail: (state, action) => {
      state.forgotEmail = action.payload;
    },
    saveVerifyCode: (state, action) => {
      state.verifyCode = action.payload;
    },
  },
});
export const {
  saveAccessToken,
  saveUserData,
  saveForgotEmail,
  saveVerifyCode,
} = userSlice.actions;
export default userSlice.reducer;
