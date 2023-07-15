/* eslint-disable @next/next/no-img-element */
// ** Rect Import
import { useEffect, useState } from "react";

// ** Style File Import
import styles from "./ViewLeft.module.scss";

// ** Icons Import
import { RxUpload } from "react-icons/rx";
import { AiFillHeart } from "react-icons/ai";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// ** Custom Error
import modifyError from "@/helper";

// ** Service
import { addProductToFavorite } from "@/services/favourites.service";
import { toast } from "react-hot-toast";

// ** Types
import { FavoriteProductStatus } from "@/types/product";
import { updateisFavoriteFlag } from "@/store/reducers/productSlice";
import { useRouter } from "next/router";

const ProductDetailViewLeft = () => {
  const router = useRouter();

  // ** Store
  const dispatch = useDispatch<AppDispatch>();
  const { ProductDetail } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.user);

  // ** State
  const [userData, setuserData] = useState<any>({});
  const [imgIndex, setimgIndex] = useState<string>(
    ProductDetail?.images[0]?.url
  );

  // ** Hook
  useEffect(() => {
    setuserData(user);
  }, []);
  // ** Handle
  const addToFavorite = async (id: number) => {
    try {
      if (userData?.id === null || userData?.id < 0) {
        toast.error("Please Login");
        return;
      }
      const res = await addProductToFavorite(id);
      toast.success(res?.message);
      if (res?.action === FavoriteProductStatus.added) {
        dispatch(updateisFavoriteFlag(true));
      } else {
        dispatch(updateisFavoriteFlag(false));
      }
    } catch (error: any) {
      if (error?.response?.data?.statusCode === 401) {
        router.push("/login");
      }

      modifyError(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.favoriteButtonwrapper}>
        <div className={styles.buttonWrapper}>
          <div className={styles.uploadButton}>
            <RxUpload className={styles.uploadIcon} />
          </div>
          <div
            className={
              ProductDetail?.isFavorite
                ? styles.favoriteButtonActive
                : styles.favoriteButton
            }
            onClick={() => addToFavorite(ProductDetail?.id)}>
            <AiFillHeart className={styles.favoriteIcon} />
          </div>
        </div>
      </div>
      <div className={styles.productImageWrapper}>
        <img src={imgIndex} alt="product" className={styles.productImage} />
        <div className={styles.productImagesWrapper}>
          {ProductDetail.images?.map((item, index) => (
            <div
              key={index}
              className=" min-w-[90px] w-[90px] ml-2 cursor-pointer"
              onClick={() => setimgIndex(item?.url)}>
              <img
                src={item?.url}
                alt={item?.url}
                className=" rounded-lg  h-[80px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailViewLeft;
