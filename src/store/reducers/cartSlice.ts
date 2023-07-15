// ** Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// ** Types
import { SingleProductType, shippingInfo } from "@/types/product";

// ** InitialState
const initialState = {
  cartItems: [] as SingleProductType[],
  shippingInfo: {} as shippingInfo,
};

// ** Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (product) => product?.id === item?.id
      );
      if (isItemExist) {
        state.cartItems = state.cartItems.map((product) => {
          if (product?.id === isItemExist?.id) {
            if (product?.qty + item?.qty <= item?.stock) {
              return { ...item, qty: product?.qty + item?.qty };
            }
            return { ...item, qty: item?.stock };
          } else {
            return product;
          }
        });
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    increaseQty: (state, action) => {
      const { id, qty } = action.payload;
      state.cartItems = state.cartItems?.map((item) => {
        if (item?.id === id) {
          return {
            ...item,
            qty: qty <= item?.stock ? qty : item?.stock,
          };
        }
        return item;
      });
    },
    decreaseQty: (state, action) => {
      const { id, qty } = action.payload;
      state.cartItems = state.cartItems?.map((item) => {
        if (item?.id === id) {
          return {
            ...item,
            qty: qty < 1 ? 1 : qty,
          };
        }
        return item;
      });
    },
    removeProductToCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (product) => product?.id != action.payload
      );
    },
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    resetCartItemsAndShippingInfo: (state) => {
      state.cartItems = [];
      state.shippingInfo = {} as shippingInfo;
    },
  },
});
export const {
  addProductToCart,
  removeProductToCart,
  increaseQty,
  decreaseQty,
  setShippingInfo,
  resetCartItemsAndShippingInfo,
} = cartSlice.actions;
export default cartSlice.reducer;
