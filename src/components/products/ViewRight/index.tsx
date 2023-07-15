/* eslint-disable @next/next/no-img-element */
// ** Style File Import
import styles from "./ViewRight.module.scss";

// ** Custom Component
import ProductCard from "./productCard";

// ** Third Party Import
import { RotatingLines, TailSpin } from "react-loader-spinner";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// ** Types
import { SingleProductType } from "@/types/product";

// ** Service
import { getProductsList } from "@/services/product.service";
import modifyError from "@/helper";
import { setProducts } from "@/store/reducers/productSlice";
import { useState } from "react";

interface Prop {
  selectedCategory: string;
  productListLoading: boolean;
}

const ProductViewRight = ({ productListLoading, selectedCategory }: Prop) => {
  const [loadMoreLoading, setloadMoreLoading] = useState(false);
  const [page, setPage] = useState<number>(2);
  // ** Store
  const { data, total } = useSelector((state: RootState) => state.product);

  // ** Hook
  const dispatch = useDispatch<AppDispatch>();
  const GetProductList = async () => {
    try {
      setloadMoreLoading(true);
      const res = await getProductsList({
        limit: 12,
        page: page,
        category: selectedCategory,
      });
      dispatch(setProducts(res));
      setloadMoreLoading(false);
    } catch (error) {
      modifyError(error);
    }
  };

  return (
    <>
      {productListLoading ? (
        <div className="w-full h-[50vh]  flex justify-center items-center">
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
      ) : data?.length === 0 && productListLoading === false && total === 0 ? (
        <div className="flex justify-center mt-20">
          <img src="images/icons/nodatafound.svg" alt="nodatafound" />
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.productWrapper}>
            {data?.map((product: SingleProductType, index: number) => (
              <div key={index} className="w-full flex justify-center ">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {data?.length < total && (
            <div className={styles.loadmoreWrapper}>
              <button
                className={styles.loadmoreButton}
                onClick={() => {
                  setPage(page + 1);
                  GetProductList();
                }}>
                {loadMoreLoading && (
                  <RotatingLines
                    strokeColor="#173F35"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
                  />
                )}

                <span> load more</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductViewRight;
