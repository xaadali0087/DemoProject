// ** Style File Import
import styles from "./login.module.scss";

// ** Custom Component
import LoginViewLeft from "./ViewLeft";
import LoginViewRight from "./ViewRight";
const Login = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.viewLeft}>
        <LoginViewLeft />
      </div>
      <div className={styles.viewRight}>
        <LoginViewRight />
      </div>
    </div>
  );
};

export default Login;
