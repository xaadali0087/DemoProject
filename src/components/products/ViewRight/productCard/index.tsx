/* eslint-disable @next/next/no-img-element */
// ** Style File Import
import styles from "./productCard.module.scss";

// ** Icons Import
import { BsPlus } from "react-icons/bs";

// ** Types
import { SingleProductType } from "@/types/product";

// ** Next Import
import { useRouter } from "next/router";

// ** Service
import { addtoCart } from "@/services/cart.service";

interface Props {
  product: SingleProductType;
}

const ProductCard = ({ product }: Props) => {
  const router = useRouter();

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardImageWrapper}>
        {product?.images?.map((img, index) => {
          if (img?.isThumbnail === true) {
            return (
              <img
                key={index}
                src={img?.url}
                alt={img?.url}
                onClick={() =>
                  router.push(
                    `/products/detail?slug=${product?.slug}&aliasId=${product?.aliasId}`
                  )
                }
              />
            );
          }
        })}
        {product?.stock <= 0 ? (
          <></>
        ) : (
          <div
            className={styles.additemIcon}
            onClick={() => addtoCart(product?.slug, product?.aliasId)}>
            <BsPlus />
          </div>
        )}
      </div>
      <label className={styles.cardTitle}>{product.title}</label>
      <p className={styles.cardPrice}>$ {product.price}</p>
    </div>
  );
};

export default ProductCard;
