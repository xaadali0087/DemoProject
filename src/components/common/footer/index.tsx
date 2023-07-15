// ** Style File Import
import styles from "./footer.module.scss";

// ** Custom Component
import Deals from "./deals";
import FooterSection from "./footerSection";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      {/* <Deals /> */}
      <FooterSection />
    </div>
  );
};

export default Footer;
