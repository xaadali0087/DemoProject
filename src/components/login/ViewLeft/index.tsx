// ** Style File Import
import styles from "./ViewLeft.module.scss";

// ** Custom Component
import SLider from "@/components/common/slider";

const LoginViewLeft = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <label className={styles.heading}>Welcome back!</label>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
          mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.
        </p>
        <div className={styles.swiper}>
          <SLider />
        </div>
      </div>
    </div>
  );
};

export default LoginViewLeft;
