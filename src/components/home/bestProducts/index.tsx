/* eslint-disable @next/next/no-img-element */
// ** Style File Import
import styles from "./bestProducts.module.scss";
// ** Next Imports

import { useRouter } from "next/router";

// ** React Icon
import { BsPlus } from "react-icons/bs";

// ** Custom Error
import modifyError from "@/helper";

// ** Service
import { getProductsList } from "@/services/product.service";
import { addtoCart } from "@/services/cart.service";

// ** React Import
import { useEffect, useState } from "react";

// ** Types
import { SingleProductType } from "@/types/product";
import { TailSpin } from "react-loader-spinner";

const BestProducts = () => {
  const router = useRouter();
  // ** State
  const [loading, setloading] = useState<boolean>(true);
  const [productList, setproductList] = useState<SingleProductType[]>([]);
  const GetProductList = async () => {
    try {
      const res = await getProductsList({
        limit: 10,
      });

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
      <label>Best Products </label>
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
        <div className={styles.cardWrapper}>
          {productList?.map((item, index) => (
            <div className={styles.card} key={index}>
              <div>
                <div className={styles.cardImageWrapper}>
                  {item?.images?.map((img, index) => {
                    if (img?.isThumbnail === true) {
                      return (
                        <img
                          key={index}
                          src={img?.url}
                          alt="logo"
                          className="h-[260px] w-[260px]"
                          onClick={() =>
                            router.push(
                              `/products/detail?slug=${item?.slug}&aliasId=${item?.aliasId}`
                            )
                          }
                        />
                        // <img
                        //   key={index}
                        //   src={img?.url}
                        //   alt={img?.url}
                        //   onClick={() =>
                        //     router.push(
                        //       `/products/detail?slug=${product?.slug}&aliasId=${product?.aliasId}`
                        //     )
                        //   }
                        // />
                      );
                    }
                  })}
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
                  <p>{item?.title}</p>
                  <span>$ {item?.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BestProducts;
