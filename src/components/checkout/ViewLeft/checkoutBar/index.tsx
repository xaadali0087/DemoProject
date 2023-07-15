// ** Styles File Import
import styles from "./checkoutbar.module.scss";

const CheckoutBar = (props: any) => {
  // ** Props
  const { value } = props;

  return (
    <div className={styles.wrapper}>
      <label className={value >= 0 ? styles.active : styles.inactive}>
        Address
      </label>
      <div className="w-full mx-1 md:mx-5 border-[#173f35] border"></div>
      <label className={value >= 0 ? styles.active : styles.inactive}>
        Shipping
      </label>
      <div className="mx-1 md:mx-5 w-full border-[#173f35] border"></div>
      <label className={value >= 1 ? styles.active : styles.inactive}>
        Payment
      </label>
    </div>
  );
};

export default CheckoutBar;
