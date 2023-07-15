// ** Style File Import
import styles from "./products.module.scss";

// ** Custom Component
import ProductHeader from "./Header";
import ProductViewLeft from "./ViewLeft";
import ProductViewRight from "./ViewRight";

// ** React Import
import { useEffect, useRef, useState } from "react";

// ** Service
import { getProductsList } from "../../services/product.service";

// ** Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setProducts, setProductsEmpty } from "@/store/reducers/productSlice";

// ** Third Party Import
import { TailSpin } from "react-loader-spinner";

// ** Custom Error
import modifyError from "@/helper";

// ** Next Import
import { useRouter } from "next/router";

const Products = () => {
  const router = useRouter();
  const { category } = router.query;

  // ** State
  const [loading, setloading] = useState(true);
  const [productListLoading, setproductListLoading] = useState(false);

  // const [pageSize, setPageSize] = useState<number>(10);
  // const [page, setPage] = useState<number>(1);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    category ? (category as string) : ""
  );

  // ** Hook
  const dispatch = useDispatch<AppDispatch>();

  const GetProductList = async () => {
    setproductListLoading(true);
    try {
      if (loading === true) {
        dispatch(setProductsEmpty());
      }
      const res = await getProductsList({
        limit: 12,
        page: 1,
        category: selectedCategory,
      });
      dispatch(setProducts(res));
      setloading(false);
      setproductListLoading(false);
    } catch (error) {
      modifyError(error);
      setproductListLoading(false);
    }
  };

  useEffect(() => {
    GetProductList();
  }, [selectedCategory]);

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
        <div className="w-full">
          <ProductHeader />
          <div className={styles.wrapper}>
            <div className={styles.col1}>
              <ProductViewLeft setSelectedCategory={setSelectedCategory} />
            </div>
            <div className={styles.col2}>
              <ProductViewRight
                productListLoading={productListLoading}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
