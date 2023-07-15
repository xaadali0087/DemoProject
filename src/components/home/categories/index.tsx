/* eslint-disable @next/next/no-img-element */
// ** Style File Imports
import styles from "./categories.module.scss";

// ** Third Party
import Marquee from "react-fast-marquee";

// ** Custom Error
import modifyError from "@/helper";

// ** Service
import { getCategory } from "@/services/product.service";

// ** React Import
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

// ** Types
import { SingleCategoryType } from "@/types/product";

// ** Next Import
import { useRouter } from "next/router";

const Categories = () => {
  const router = useRouter();
  // ** State
  const [loading, setloading] = useState(true);
  const [categoryList, setCategoryList] = useState<SingleCategoryType[]>([]);

  const GetCategoryList = async () => {
    try {
      const res = await getCategory();
      setCategoryList(res);
      setloading(false);
    } catch (error) {
      modifyError(error);
    }
  };

  // ** Hook
  useEffect(() => {
    GetCategoryList();
  }, []);

  return (
    <div className={styles.wrapper}>
      <label>Categories</label>
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
          {categoryList?.map((item, index) => (
            <div className={styles.card} key={index}>
              <img
                src={item?.iconUrl}
                alt={item?.iconUrl}
                className={styles.carticon}
                onClick={() => router.push(`/products?category=${item?.title}`)}
              />
              <p>{item?.title}</p>
            </div>
          ))}
        </Marquee>
      )}
    </div>
  );
};

export default Categories;
