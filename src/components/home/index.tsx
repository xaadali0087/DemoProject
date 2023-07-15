// ** Styles FIle Import
import styles from "./home.module.scss";

// ** Custom Component
import MainSlider from "./mainSlider";
import Categories from "./categories";
import BestProducts from "./bestProducts";
const Home = () => {
  return (
    <div className={styles.wrapper}>
      <MainSlider />
      <Categories />
      <BestProducts />
    </div>
  );
};

export default Home;
