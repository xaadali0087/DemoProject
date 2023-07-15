/* eslint-disable @next/next/no-img-element */
// ** Style File Import
import styles from "./yourCart.module.scss";

// ** Next Import
import { useRouter } from "next/router";

// ** Types
import { SingleProductType } from "@/types/product";

// ** Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { removeProductToCart } from "@/store/reducers/cartSlice";
interface Props {
  data: SingleProductType[];
  value: number;
}

const YourCart = ({ data, value }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className={styles.wrapper}>
      <label>Your cart</label>

      <div className={styles.itemWrapper}>
        {data?.map((item, index) => (
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
                  className=" cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/products/detail?slug=${item?.slug}&aliasId=${item?.aliasId}`
                    )
                  }>
                  {item?.title}
                </label>
                <p>Quantity: {item?.qty}</p>
                <label>$ {item?.price}</label>
                {value === 0 && (
                  <div className={styles.removeButton}>
                    <button
                      onClick={() => dispatch(removeProductToCart(item?.id))}>
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className=" w-full my-3 border-gray-200 border"></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default YourCart;
