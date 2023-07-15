/* eslint-disable @next/next/no-img-element */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// ** Style File Import
import styles from "./mainSlider.module.scss";

// ** Next Import
import Link from "next/link";



const MainSlider = () => {
  return (
    <div>


      <div className={styles.card}>
        <video
          className={styles.backgroundVideo}
          loop
          autoPlay
          muted
          controls={false}
          playsInline
          preload="true"
        >
          <source src={"/images/videos/demo.mp4"} type="video/mp4" />
        </video>
        <div className={styles.box}>
          <label>Unleash the Power of Technology</label>
          <p>Shop the Future, Today</p>
          <Link href={"/products"} className={styles.exploreButton}>
            <img
              src={"/images/icons/global-search.svg"}
              alt="search"
              className={styles.searchIcon}
            />
            Explore
          </Link>
        </div>
      </div>


    </div>
  );
};

export default MainSlider;
