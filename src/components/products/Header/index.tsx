// ** Style File Import
import styles from "./header.module.scss";

const ProductHeader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <label>Products </label>
        <p>
          Revamp your style with the latest designer trends in men’s clothing or
          achieve a
        </p>
        <p>
          perfectly curated wardrobe thanks to our line-up of timeless pieces.
        </p>
      </div>
    </div>
  );
};

export default ProductHeader;
