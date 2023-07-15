// ** Style File Import
import styles from "./checkout.module.scss";

// ** Custom Component
import CheckoutViewLeft from "./ViewLeft";
import CheckoutViewRight from "./ViewRight";

// ** React Import
import { useState } from "react";

const Checkout = () => {
  // ** State
  const [value, setvalue] = useState<number>(0);
  return (
    <div className={styles.wrapper}>
      <div className={styles.col1}>
        <CheckoutViewLeft value={value} setvalue={setvalue} />
      </div>
      <div className={styles.col2}>
        <CheckoutViewRight value={value} />
      </div>
    </div>
  );
};

export default Checkout;
