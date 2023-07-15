// ** Styles File Import
import styles from "./forgotPassword.module.scss";

// ** Custom Component
import ForgotPasswordViewLeft from "./ViewLeft";
import ForgotPasswordViewRight from "./ViewRight";
const ForgotPassword = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.viewLeft}>
        <ForgotPasswordViewLeft />
      </div>
      <div className={styles.ViewRight}>
        <ForgotPasswordViewRight />
      </div>
    </div>
  );
};

export default ForgotPassword;
