// ** Style File Import
import styles from "./footerSection.module.scss";

// * Data
import { ShopData, HelpData, AboutData } from "./data";

const FooterSection = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.col1}>
        <div className={styles.box}>
          <label>Sign up for our newsletter</label>
          <p>
            Be the first to know about our special offers, new product
            <br /> launches, and events
          </p>
          <div className={styles.newsletteremail}>
            <input type="text" placeholder="Email Address " />
            <button>Sign Up</button>
          </div>
        </div>
      </div>
      <div className={styles.col2}>
        <div className="w-[70%] mx-auto ">
          <label>Shop</label>
          <div className={styles.box}>
            {ShopData.map((item, index) => {
              return <p key={index}>{item.name}</p>;
            })}
          </div>
        </div>
      </div>
      <div className={styles.col3}>
        <div className="w-[70%]  mx-auto">
          <label>Help</label>
          <div className={styles.box}>
            {HelpData.map((item, index) => {
              return <p key={index}>{item.name}</p>;
            })}
          </div>
        </div>
      </div>
      <div className={styles.col4}>
        <div className="w-[70%] mx-auto ">
          <label>About</label>
          <div className={styles.box}>
            {AboutData.map((item, index) => {
              return <p key={index}>{item.name}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
