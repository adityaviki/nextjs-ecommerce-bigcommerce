import ProductCard from "./productCard";
import SingleItemCarousel from "../carousel/singleItemCarousel";
import MultiItemCarousel from "../carousel/multiItemCarousel";
import { getNewProducts } from "@/lib/bigCommerce";

const NewProducts = async () => {
  const newProducts = await getNewProducts();
  return (
    <div>
      <div className="text-center text-[32px] font-bold">New Arrivals</div>
      <div className="hidden mt-6 md:block">
        <MultiItemCarousel>
          {newProducts.map((product) => {
            return <ProductCard key={product.entityId} product={product} />;
          })}
        </MultiItemCarousel>
      </div>
      <div className="md:hidden mt-6 w-full">
        <SingleItemCarousel slide={false}>
          {newProducts.map((product) => {
            return <ProductCard key={product.entityId} product={product} />;
          })}
        </SingleItemCarousel>
      </div>
    </div>
  );
};

export default NewProducts;
