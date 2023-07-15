// ** Style File Import
import styles from "./detail.module.scss";

// ** Custom Component
import ProductDetailViewLeft from "./ViewLeft";
import ProductDetailViewRight from "./ViewRight";

// ** React Import
import { useEffect, useState } from "react";

// ** Service
import { getSingleProductDetail } from "../../../services/product.service";

// ** Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setProductDetail } from "@/store/reducers/productSlice";
import { TailSpin } from "react-loader-spinner";

// ** Custom Error
import modifyError from "@/helper";

interface Props {
  slug: string;
  aliasId: string;
}

const ProductDetail = ({ slug, aliasId }: Props) => {
  // ** State
  const [loading, setloading] = useState(true);
  // ** Hook
  const dispatch = useDispatch<AppDispatch>();

  const GetSingleProductDetail = async () => {
    try {
      const res = await getSingleProductDetail({ slug, aliasId });
      dispatch(setProductDetail(res));
      setloading(false);
    } catch (error) {
      modifyError(error);
    }
  };
  useEffect(() => {
    GetSingleProductDetail();
  }, []);

  return (
    <>
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
          <div className={styles.col}>
            <ProductDetailViewLeft />
          </div>
          <div className={styles.col}>
            <ProductDetailViewRight />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
