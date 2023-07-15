// ** Style File Import
import styles from "./ViewLeft.module.scss";

// ** Custom Component
import SLider from "@/components/common/slider";

const SignUpViewLeft = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <label className={styles.heading}>
          Start Your <br /> Journey With Us
        </label>
        <p className={styles.text}>
          Our Registration process is quick and essay, Taking no more than 10
          minutes to complete.
        </p>
        <div className={styles.swiper}>
          <SLider />
        </div>
      </div>
    </div>
  );
};

export default SignUpViewLeft;
