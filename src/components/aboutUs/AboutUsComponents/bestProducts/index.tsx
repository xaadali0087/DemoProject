/* eslint-disable @next/next/no-img-element */
// ** Style File Imports
import styles from "./bestProducts.module.scss";

// ** Next Imports
import { useRouter } from "next/router";

// ** Third Party
import Marquee from "react-fast-marquee";
import { BsPlus } from "react-icons/bs";

// ** Data
import valueData from "./data";

// ** Custom Error
import modifyError from "@/helper";
import { getProductsList } from "@/services/product.service";

// ** React Import
import { useEffect, useState } from "react";

// ** Types
import { SingleProductType } from "@/types/product";
import { TailSpin } from "react-loader-spinner";

import { addtoCart } from "@/services/cart.service";

const BestProductsSlider = () => {
  const router = useRouter();
  // ** State
  const [loading, setloading] = useState(true);
  const [productList, setproductList] = useState<SingleProductType[]>([]);
  const GetProductList = async () => {
    try {
      const res = await getProductsList({ limit: 10 });
      setproductList(res?.data);
      setloading(false);
    } catch (error) {
      modifyError(error);
    }
  };
  useEffect(() => {
    GetProductList();
  }, []);

  return (
    <div className={styles.wrapper}>
      <label>Best Products</label>

      {loading ? (
        <div className="w-full h-[20vh]  flex justify-center items-center">
          <TailSpin
            height="80"
            width="80"
            color="#173F35"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <Marquee
          className={styles.cardWrapper}
          autoFill={true}
          pauseOnHover={true}
          speed={60}
          gradient={false}>
          <div className="flex">
            {productList?.map((item, index) => (
              <div className={styles.card} key={index}>
                <div className={styles.cardImageWrapper}>
                  {item?.images?.map((img, index) =>
                    img?.isThumbnail == true ? (
                      <img
                        key={index}
                        src={img?.url}
                        alt="logo"
                        className=" w-[260px] h-[260px]"
                        onClick={() =>
                          router.push(
                            `/products/detail?slug=${item?.slug}&aliasId=${item?.aliasId}`
                          )
                        }
                      />
                    ) : (
                      <></>
                    )
                  )}
                  {item?.stock <= 0 ? (
                    <></>
                  ) : (
                    <div
                      className={styles.additemIcon}
                      onClick={() => addtoCart(item?.slug, item?.aliasId)}>
                      <BsPlus />
                    </div>
                  )}
                </div>
                <div>
                  <p className={styles.cardTitle}>{item?.title}</p>
                  <p className={styles.cardPrice}>$ {item?.price}</p>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      )}
    </div>
  );
};

export default BestProductsSlider;
