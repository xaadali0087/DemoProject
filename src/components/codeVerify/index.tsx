// ** Style File Import
import styles from "./codeVerify.module.scss";

// ** Custom Component
import CodeVerifyViewLeft from "./ViewLeft";
import CodeVerifyViewRight from "./ViewRight";

const CodeVerify = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.viewLeft}>
        <CodeVerifyViewLeft />
      </div>
      <div className={styles.viewRight}>
        <CodeVerifyViewRight />
      </div>
    </div>
  );
};

export default CodeVerify;
