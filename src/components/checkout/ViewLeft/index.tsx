// ** Style File Import
import styles from "./ViewLeft.module.scss";

// ** Custom Component
import Shipping from "./shipping";
import Payment from "./payment";

// ** React Import
import { useEffect, useState } from "react";

// ** Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// ** Types
import { SingleProductType } from "@/types/product";

interface Props {
  value: number;
  setvalue: (num: number) => void;
}

const CheckoutViewLeft = ({ value, setvalue }: Props) => {
  // ** State

  const [cartItemArr, setCartItemArr] = useState<SingleProductType[]>([]);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  // ** Hook
  useEffect(() => {
    setCartItemArr(cartItems);
  }, [cartItems]);

  return (
    <div className={styles.wrapper}>
      {value === 0 ? (
        <Shipping value={value} setvalue={setvalue} data={cartItemArr} />
      ) : (
        <Payment value={value} data={cartItemArr} />
      )}
    </div>
  );
};

export default CheckoutViewLeft;
