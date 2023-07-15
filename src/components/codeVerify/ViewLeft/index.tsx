// ** Style File Import
import styles from "./ViewLeft.module.scss";

// ** Custom Component
import SLider from "@/components/common/slider";

const CodeVerifyViewLeft = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <label>Enter verification code</label>
        <p className={styles.vcText}>
          To enter a verification code, you will typically receive an email or
          text message that contains the code. The message may also include a
          link to a verification page where you can enter the code. Follow these
          steps to enter a verification code.
        </p>
        <div className={styles.swiper}>
          <SLider />
        </div>
      </div>
    </div>
  );
};

export default CodeVerifyViewLeft;
