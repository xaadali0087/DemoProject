// ** Style File Import
import styles from "./ViewLeft.module.scss";

// ** Custom Component
import YourCart from "./yourCart";
import OrderInformation from "./orderInformation";

const CartViewLeft = () => {
  return (
    <div className={styles.wrapper}>
      <YourCart />
      <OrderInformation />
    </div>
  );
};

export default CartViewLeft;
