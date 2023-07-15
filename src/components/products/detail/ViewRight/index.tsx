// ** Style File Import
import styles from "./ViewRight.module.scss";

// ** Icon Import
import { BsPlus } from "react-icons/bs";
import { HiMinusSm } from "react-icons/hi";

// ** Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// ** React Import
import { useState } from "react";

// ** Service
import { addtoCart } from "@/services/cart.service";
import MoreAndLessText from "@/components/common/MoreAndLessText";

const ProductDetailViewRight = () => {
  // ** State
  const [qty, setqty] = useState<number>(1);
  // ** Store
  const { ProductDetail } = useSelector((state: RootState) => state.product);

  // ** Handle
  const increaseQty = () => {
    if (qty === ProductDetail?.stock || ProductDetail?.stock === 0) {
      return;
    }
    setqty(qty + 1);
  };
  const decreaseQty = () => {
    if (qty <= 1) {
      return;
    }
    setqty(qty - 1);
  };
  // const handleQty = (e: { target: { value: any } }) => {
  //   const value = e.target.value;
  //   if (value <= ProductDetail?.stock) {
  //     setqty(parseInt(value));
  //   } else {
  //     return;
  //   }
  // };
  console.log(Number(ProductDetail?.price));

  return (
    <div className={styles.wrapper}>
      <label>{ProductDetail?.title}</label>
      <p>Price $ {ProductDetail?.price}</p>
      <MoreAndLessText description={ProductDetail?.description} />

      <div className={styles.cartWrapper}>
        <button
          disabled={ProductDetail?.stock <= 0}
          className={styles.addtoCartButton}
          onClick={() =>
            addtoCart(ProductDetail?.slug, ProductDetail?.aliasId, qty)
          }>
          Add to Cart - $ {(Number(ProductDetail?.price) * qty).toFixed(5)}
        </button>

        <div className={styles.qtyButton}>
          <button onClick={decreaseQty}>
            <HiMinusSm className="text-[27px] text-black p-1 cursor-pointer" />
          </button>
          <input type="number" disabled value={qty} />
          <button onClick={increaseQty}>
            <BsPlus className="text-[30px] p-1 cursor-pointer" />
          </button>
        </div>
      </div>
      <div className={styles.freeShipping}>
        Free standard shipping&nbsp; <span> Free Returns</span>
      </div>
    </div>
  );
};

export default ProductDetailViewRight;
