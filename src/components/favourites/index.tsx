/* eslint-disable @next/next/no-img-element */
// ** Styles File Import
import styles from "./favourites.module.scss";

// ** Next Imports
import Image from "next/image";
import { useRouter } from "next/router";
// ** React Icon
import { BsPlus } from "react-icons/bs";

// ** React Import
import { useEffect, useState } from "react";

// ** Custom Error
import modifyError from "@/helper";

// ** Service
import { getFavouritesProductList } from "@/services/favourites.service";
import { addtoCart } from "@/services/cart.service";
// ** Types
import { SingleProductType } from "@/types/product";
import { TailSpin } from "react-loader-spinner";

const FavouritesProduct = () => {
  const router = useRouter();
  // ** State
  const [favouriteProducts, setfavouriteProducts] = useState<
    SingleProductType[]
  >([]);
  const [loading, setloading] = useState<boolean>(true);

  const GetFavouritesProductList = async () => {
    try {
      const res = await getFavouritesProductList();
      setfavouriteProducts(res);
      setloading(false);
    } catch (error) {
      modifyError(error);
    }
  };
  // ** Hook
  useEffect(() => {
    GetFavouritesProductList();
  }, []);

  return (
    <div className=" w-full min-h-screen h-screen">
      {loading ? (
        <div className="w-full h-[70vh]  flex justify-center items-center">
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
        <div className={styles.wrapper}>
          <div className={styles.headerWrapper}>
            <label className={styles.headerTitle}>Favorites</label>
            <div className=" text-start">
              <p className={styles.headerParagraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <button className={styles.headerButton}>Shop All</button>
          </div>
          <div className=" container flex flex-col items-center mt-10  ">
            {favouriteProducts.length > 0 ? (
              <>
                <div className={styles.cardWrapper}>
                  {favouriteProducts?.map((item, index) => (
                    <div className={styles.card} key={index}>
                      <div className="w-[260px]">
                        <div className={styles.cardImageWrapper}>
                          {item?.images?.map((img, index) =>
                            img?.isThumbnail === true ? (
                              <img
                                key={index}
                                src={img?.url}
                                alt="logo"
                                className=" h-[260px] w-[260px]"
                                onClick={() =>
                                  router.push(
                                    `/products/detail?slug=${item?.slug}&aliasId=${item?.aliasId}`
                                  )
                                }
                              />
                            ) : (
                              <></>
                              // <Image
                              //   key={index}
                              //   src={"/images/background/no-Image.png"}
                              //   height={260}
                              //   width={260}
                              //   alt="logo"
                              // />
                            )
                          )}
                          {item?.stock <= 0 ? (
                            <></>
                          ) : (
                            <div
                              className={styles.additemIcon}
                              onClick={() =>
                                addtoCart(item?.slug, item?.aliasId)
                              }>
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
              </>
            ) : (
              <div className="flex justify-center mt-20">
                <img src="images/icons/nodatafound.svg" alt="nodatafound" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouritesProduct;
