/* eslint-disable @next/next/no-img-element */
// ** Style File Import
import styles from "./yourCart.module.scss";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  decreaseQty,
  increaseQty,
  removeProductToCart,
} from "@/store/reducers/cartSlice";

// ** Next Import
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SingleProductType } from "@/types/product";
import { HiMinusSm } from "react-icons/hi";
import { BsPlus } from "react-icons/bs";

const YourCart = () => {
  // ** State
  const [cartItemArr, setCartItemArr] = useState<SingleProductType[]>([]);
  // ** Store
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const router = useRouter();

  useEffect(() => {
    setCartItemArr(cartItems);
  }, [cartItems]);

  return (
    <div className={styles.wrapper}>
      <label>Your cart</label>
      {cartItemArr.length === 0 ? (
        <p className={styles.continueShoppingText}>
          Cart is empty. Please go back to the &nbsp;
          <span className=" underline" onClick={() => router.push("/products")}>
            Product page.
          </span>
        </p>
      ) : (
        <p className={styles.continueShoppingText}>
          Not ready to checkout?{" "}
          <span className=" underline" onClick={() => router.push("/products")}>
            Continue Shopping
          </span>
        </p>
      )}

      {cartItemArr.length === 0 ? (
        <div className="flex justify-center">
          <img src="images/icons/cart.svg" alt="empty-cart" />
        </div>
      ) : (
        <div className={styles.itemWrapper}>
          {cartItemArr?.map((item, index) => (
            <>
              <div key={index} className={styles.itemsDetailWrapper}>
                <div className={styles.itemImg}>
                  {item?.images?.map((img, index) =>
                    img?.isThumbnail === true ? (
                      <img
                        key={index}
                        src={img?.url}
                        className=" h-[90px]"
                        alt={img?.url}
                      />
                    ) : (
                      <></>
                    )
                  )}
                </div>
                <div className={styles.itemDetail}>
                  <label
                    onClick={() =>
                      router.push(
                        `/products/detail?slug=${item?.slug}&aliasId=${item?.aliasId}`
                      )
                    }>
                    {item?.title}
                  </label>

                  <p>Quantity: {item?.qty}</p>

                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQty({ id: item?.id, qty: item?.qty - 1 })
                        )
                      }>
                      <HiMinusSm className="text-[21px] p-1 text-black bg-red-600" />
                    </button>

                    <input
                      type="number"
                      disabled
                      value={item?.qty}
                      className="w-[50px] text-center"
                    />
                    <button
                      onClick={() =>
                        dispatch(
                          increaseQty({ id: item?.id, qty: item?.qty + 1 })
                        )
                      }>
                      <BsPlus className="text-[21px] text-black p-1 cursor-pointer bg-red-600" />
                    </button>
                  </div>

                  <label>$ {item?.price}</label>
                  <div className={styles.removeButton}>
                    <button
                      onClick={() => dispatch(removeProductToCart(item?.id))}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div className=" w-full my-3 border-gray-200 border"></div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourCart;
