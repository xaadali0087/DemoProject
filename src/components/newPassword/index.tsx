// ** Styles File Import
import styles from "./newPasword.module.scss";

// ** Custom Component
import NewPasswordViewLeft from "./ViewLeft";
import NewPasswordViewRight from "./ViewRight";
const NewPassword = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.viewLeft}>
        <NewPasswordViewLeft />
      </div>
      <div className={styles.ViewRight}>
        <NewPasswordViewRight />
      </div>
    </div>
  );
};

export default NewPassword;
