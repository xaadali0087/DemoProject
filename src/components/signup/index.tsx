// ** Styles File Import
import styles from "./signup.module.scss";

// ** Custom Component
import SignUpViewLeft from "./ViewLeft";
import SignUpViewRight from "./ViewRight";

const SignUp = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.viewLeft}>
        <SignUpViewLeft />
      </div>
      <div className={styles.ViewRight}>
        <SignUpViewRight />
      </div>
    </div>
  );
};

export default SignUp;
