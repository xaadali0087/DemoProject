/* eslint-disable @next/next/no-img-element */
// ** Style File Import
import styles from "./deals.module.scss";

const Deals = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.col1}>
        <img src="/images/cards/Frame163005.svg" alt="word" />
      </div>
      <div className={styles.col2}>
        <div>
          <p>Sign up to get the latest on sales, new releases and more...</p>

          <div className={styles.box}>
            <input type="text" placeholder="Enter your email address... " />
            <button>Sign Up</button>
          </div>
        </div>
      </div>
      <div className={styles.col3}>
        <img src="/images/cards/Frame163006.svg" alt="icon" />
      </div>
    </div>
  );
};

export default Deals;
