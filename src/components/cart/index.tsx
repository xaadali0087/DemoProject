// ** Style File Import
import styles from "./cart.module.scss";

// Custom Component
import CartViewLeft from "./ViewLeft";
import CartViewRight from "./ViewRight";

const Cart = () => {
  return (
    <div className=" w-full min-h-screen h-screen">
      <div className={styles.wrapper}>
        <div className={styles.col1}>
          <CartViewLeft />
        </div>
        <div className={styles.col2}>
          <CartViewRight />
        </div>
      </div>
    </div>
  );
};

export default Cart;
