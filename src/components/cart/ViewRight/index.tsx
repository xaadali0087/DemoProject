// ** Style File Import
import styles from "./ViewRight.module.scss";

// ** Next Import
import { useRouter } from "next/router";

// ** Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// ** React Import
import { useEffect, useState } from "react";

// ** Types
import { SingleProductType } from "@/types/product";

const CartViewRight = () => {
  const router = useRouter();
  // ** State
  const [cartItemArr, setCartItemArr] = useState<SingleProductType[]>([]);
  // ** Store
  const { cartItems } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    setCartItemArr(cartItems);
  }, [cartItems]);

  return (
    <div className={styles.wrapper}>
      <label>Order Summary</label>
      {/* <input type="text" placeholder="Enter coupon code here" /> */}
      <div className="mt-5">
        <div className="flex  justify-between">
          <p>Subtotal</p>
          <p>
            $
            {cartItemArr
              ?.reduce((acc, item) => {
                return acc + Number(item?.price) * item?.qty;
              }, 0)
              .toFixed(5)}
          </p>
        </div>
        <div className="flex  justify-between">
          <p>Shipping</p>
          <p>$0</p>
        </div>
        <div className="  my-4 border-[#173f35] border"></div>
        <div className="flex  justify-between">
          <p>Total</p>
          <p>
            $
            {cartItemArr
              ?.reduce((acc, item) => {
                return acc + Number(item?.price) * item?.qty;
              }, 0)
              .toFixed(5)}
          </p>
        </div>
      </div>
      <button
        disabled={cartItemArr.length === 0}
        onClick={() => router.push("/checkout")}>
        Continue to checkout
      </button>
    </div>
  );
};

export default CartViewRight;
