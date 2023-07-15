// ** Service
import { getSingleProductDetail } from "./product.service";

// ** Store
import { store } from "../store";
import { addProductToCart } from "@/store/reducers/cartSlice";

// Custom Error
import modifyError from "@/helper";

const addtoCart = async (slug: string, aliasId: string, qty = 1) => {
  try {
    let res = await getSingleProductDetail({ slug, aliasId });

    res = {
      ...res,
      qty,
    };
    store.dispatch(addProductToCart(res));
  } catch (error) {
    modifyError(error);
  }
};

export { addtoCart };
