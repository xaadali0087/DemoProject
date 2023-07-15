// ** Custom Component
import ProductDetail from "@/components/products/detail";
import Header from "@/components/common/header";

// ** Next Import
import { useRouter } from "next/router";

const ProductDetailPage = () => {
  const router = useRouter();
  const { slug, aliasId } = router.query;

  if (slug && aliasId) {
    return (
      <>
        {/* <Header /> */}
        <ProductDetail
          slug={slug as unknown as string}
          aliasId={aliasId as unknown as string}
        />
      </>
    );
  }
};

export default ProductDetailPage;
