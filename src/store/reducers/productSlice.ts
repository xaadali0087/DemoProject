// ** Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// ** Types
import { SingleProductType } from "@/types/product";

// ** InitialState
const initialState = {
  data: [] as any,
  total: 0,
  ProductDetail: {} as SingleProductType,
};

// ** Slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductsEmpty: (state) => {
      state.data = [];
      // state.total = 0;
    },
    setProducts: (state, action) => {
      state.data = [...state?.data, ...action?.payload?.data];
      state.total = action.payload.total;
    },
    setProductDetail: (state, action) => {
      state.ProductDetail = action.payload;
    },
    updateisFavoriteFlag: (state, action) => {
      state.ProductDetail.isFavorite = action.payload;
    },
  },
});
export const {
  setProducts,
  setProductDetail,
  setProductsEmpty,
  updateisFavoriteFlag,
} = productSlice.actions;
export default productSlice.reducer;
