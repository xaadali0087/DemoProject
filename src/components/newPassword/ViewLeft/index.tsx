// ** Style File Import
import styles from "./ViewLeft.module.scss";

// ** Custom Component
import SLider from "@/components/common/slider";

const NewPasswordViewLeft = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <label className={styles.heading}>Set new password</label>
        <p className={styles.text}>
          Make sure to choose a strong password that is difficult for others to
          guess. Use a combination of uppercase and lowercase letters, numbers,
          and special characters. Avoid using personal information like your
          name, birthdate, or address in your password.
        </p>
        <p className={styles.text}>
          Once you have set your new password, you should be able to log in to
          your account using your new credentials.
        </p>
        <div className={styles.swiper}>
          <SLider />
        </div>
      </div>
    </div>
  );
};

export default NewPasswordViewLeft;
