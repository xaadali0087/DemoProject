// ** Style File Import
import styles from "./aboutUs.module.scss";

// ** Custom Component

import AboutUsHeader from "./AboutUsComponents/aboutusHeader/aboutusHeader";
import TeamCards from "./AboutUsComponents/TeamCard";
import ValuesComp from "./AboutUsComponents/Values";
import VisionComp from "./AboutUsComponents/Vision";
import BestProductsSlider from "./AboutUsComponents/bestProducts";

const AboutUs = () => {
  return (
    <>
      <AboutUsHeader />

      <TeamCards />
      <div className={styles.container}>
        <ValuesComp />
        <VisionComp />
      </div>
      <BestProductsSlider />
    </>
  );
};

export default AboutUs;
