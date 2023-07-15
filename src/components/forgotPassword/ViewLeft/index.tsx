// ** Style File Import
import styles from "./ViewLeft.module.scss";

// ** Custom Component
import SLider from "@/components/common/slider";

const ForgotPasswordViewLeft = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <label className={styles.heading}>Forgot password?</label>
        <p className={styles.text}>
          No Worries, we’ll send you reset instructions. Once you have reset
          your password, log in to your account using your new password.
        </p>
        <p className={styles.text}>
          If you have trouble resetting your password, you may need to contact
          the website or application customer support for assistance.
        </p>
        <div className={styles.swiper}>
          <SLider />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordViewLeft;
