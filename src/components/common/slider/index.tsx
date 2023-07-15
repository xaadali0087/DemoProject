"use client"; // this is a client component 👈🏽

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Image from "next/image";
import styles from "./slider.module.scss";
import valueData from "./data";

const SLider = () => {
  return (
    <div>
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper">
        {valueData?.map((item: any, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={styles.card}>
                <div>
                  <div className={styles.wordsWrapper}>
                    <p>{item.words}</p>
                  </div>
                </div>
                <div className={styles.bottomWrapper}>
                  <Image
                    src={item?.img}
                    height={50}
                    width={50}
                    alt="services"
                  />
                  <div>
                    <p>{item?.serviceName}</p>
                    <span>{item?.service}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SLider;
