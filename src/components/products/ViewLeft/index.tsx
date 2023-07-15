// ** Style File Import
import { setProductsEmpty } from "@/store/reducers/productSlice";
import styles from "./ViewLeft.module.scss";

// ** Custom Component
import FiltersDropDown from "@/components/common/dropdown";

// ** React Import
import { useEffect, useRef, useState } from "react";

// ** Icons Import
import { RxCross2 } from "react-icons/rx";

// ** Service
import { getCategory, getSubCategory } from "@/services/product.service";

// ** Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import React from "react";

interface Props {
  setSelectedCategory: (str: string) => void;
}

const ProductViewLeft = ({ setSelectedCategory }: Props) => {
  // ** State
  const dispatch = useDispatch<AppDispatch>();

  const [categories, setcategories] = useState<{ id: number; title: string }[]>(
    []
  );
  const [subCategories, setsubCategories] = useState<
    { id: number; title: string }[]
  >([]);

  const condition = ["Condition", "New", "Repaire", "Damage"];

  const [sCategory, setsCategory] = useState({
    id: 0,
    title: "",
  });
  const [sSubCategory, setsSubCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState(condition[0]);

  // ** Hook
  useEffect(() => {
    getCategory().then((data) => {
      setcategories(data);
    });
  }, []);

  useEffect(() => {
    if (sCategory?.title) {
      getSubCategory(sCategory?.id).then((data) => {
        setsubCategories(data);
        setsSubCategory("");
      });
    }
  }, [sCategory]);

  const handleResetFilter = () => {
    dispatch(setProductsEmpty());
    setsCategory({
      id: 0,
      title: "",
    });
    setsubCategories([]);
    setsSubCategory("");
    setSelectedCategory("");
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.heading}>Filters</label>
      <div className=" w-full mt-10">
        <FiltersDropDown
          selected={sCategory?.title ? sCategory?.title : "Category"}
          setSelected={(e: any) => {
            if (e?.title !== sCategory?.title) {
              dispatch(setProductsEmpty());
              setsCategory({
                id: e?.id,
                title: e?.title,
              });

              setSelectedCategory(e?.title);
            }
          }}
          options={categories}
        />
      </div>
      <div className="w-full my-8 border-[#173f35] border"></div>
      <div className=" w-full mt-10">
        <FiltersDropDown
          selected={sSubCategory ? sSubCategory : "Subcategory"}
          setSelected={(e: any) => {
            if (e?.title !== sSubCategory) {
              dispatch(setProductsEmpty());
              setsSubCategory(e?.title);

              setSelectedCategory(e?.title);
            }
          }}
          options={subCategories}
        />
      </div>
      <div className={styles.conditionWrapper}>
        <label className={styles.conditionTitle}>Condition</label>
        <div className=" w-full">
          <FiltersDropDown
            selected={selectedCondition}
            setSelected={setSelectedCondition}
            options={condition}
          />
        </div>
        <div className="w-full my-8 border-[#173f35] border"></div>
        {sCategory?.title && (
          <div
            className={styles.resetWrapper}
            onClick={() => handleResetFilter()}>
            <RxCross2 className={styles.resetIcon} />
            <span>Reset filter</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductViewLeft);
