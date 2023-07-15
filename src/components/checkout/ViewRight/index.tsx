/* eslint-disable @next/next/no-img-element */
// ** Style File Import
import styles from "./ViewRight.module.scss";

// ** Custom Component
import YourCart from "./yourCart";

// ** Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// ** React Import
import { useEffect, useState } from "react";

// ** Types
import { SingleProductType } from "@/types/product";

// ** Next Import
import { useRouter } from "next/router";

interface Props {
  value: number;
}

const CheckoutViewRight = ({ value }: Props) => {
  const router = useRouter();
  // ** State
  const [cartItemArr, setCartItemArr] = useState<SingleProductType[]>([]);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  // ** Hook
  useEffect(() => {
    setCartItemArr(cartItems);
  }, [cartItems]);
  return (
    <div className={styles.wrapper}>
      {cartItemArr.length === 0 ? (
        <div>
          <label className="text-[28px] text-[#173F35] font-semibold">
            Your Cart
          </label>
          <p className="text-[18px] text-[#173F35]">
            Cart is empty. Please go back to the &nbsp;
            <span
              className=" underline cursor-pointer"
              onClick={() => router.push("/products")}>
              Product page.
            </span>
          </p>
          <div className="flex justify-center mt-8">
            <img src="images/icons/cart.svg" alt="empty-cart" />
          </div>
        </div>
      ) : (
        <>
          <YourCart data={cartItemArr} value={value} />
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
            <div className="  my-4 border-[#173f35]-50 border"></div>
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
        </>
      )}
    </div>
  );
};

export default CheckoutViewRight;
