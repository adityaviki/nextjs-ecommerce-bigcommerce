import Image from "next/image";
import SingleItemCarousel from "@/components/carousel/singleItemCarousel";
import MultiItemCarousel from "@/components/carousel/multiItemCarousel";
import { getNewProducts, getMenWomenCategory } from "@/lib/bigCommerce";
import ProductVariants from "@/components/home/productVariant";

const PromotionalCarrousel = () => {
  const dummyData: any = [
    {
      image: "/carousel/slide-1.png",
      heading: "Hey EU!",
      text: "We cover all duty and taxes! No unxepected charges on delivery!",
    },
    {
      image: "/carousel/slide-2.png",
      heading: "Elevate Your Style",
      text: "Step into a realm of elegance and trends. Our fashion collection is a symphony of self-expression, where every piece tells a story of style and sophistication.",
    },
    {
      image: "/carousel/slide-3.png",
      heading: "Unleash Your Creativity",
      text: "Express yourself with our versatile and unique fashion pieces. Mix and match to create your signature look that captures your individuality and creativity.",
    },
  ];

  return (
    <SingleItemCarousel>
      {dummyData.map((slide: any, index: any) => {
        return (
          <div key={index} className={`w-full relative h-[400px] md:h-[460px]`}>
            <Image
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              src={slide.image}
              alt="..."
            />
            <div className="p-6 absolute w-[80%] md:w-fit top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 left bg-white opacity-90 text-center">
              <div className="text-[42px] font-bold text-[#202020] italic">
                {slide.heading}
              </div>
              <div className="text-[16px] text-[#003459] mt-2">
                {slide.text}
              </div>
            </div>
          </div>
        );
      })}
    </SingleItemCarousel>
  );
};

const Categories = ({ menWomenCategory }: any) => {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row gap-4 mt-4">
      {menWomenCategory.map((category: any, index: number) => (
        <div
          key={index}
          className="h-[216px] w-full md:flex-1 md:h-[400px] relative"
        >
          <img
            className="absolute h-full w-full object-cover"
            src={category.image_url}
            alt={category.name}
          />
          <div className="absolute w-full text-center top-1/2 -translate-y-1/2 text-[32px] text-white font-bold">{`Shop ${category.name}`}</div>
        </div>
      ))}
    </div>
  );
};

const NewProducts = ({ newProducts }: any) => {
  if (!newProducts || !newProducts.length) return null;

  const ProductCard = ({ item }: any) => {
    return (
      <div className="w-[308px]">
        <ProductVariants item={item} />
        <div className="flex justify-between">
          <div className="text-[#202020] text-base">{item.brand || ""}</div>
          <div className="text-[#003459] font-bold text-base">
            {item.price || ""}
          </div>
        </div>
        <div className="text-[#202020] font-bold text-base">
          {item.name || ""}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-12">
      <div className="text-center text-[32px] mb-4 font-bold">New Arrivals</div>
      <div className="hidden md:block">
        <MultiItemCarousel>
          {newProducts.map((item: any, index: any) => {
            return <ProductCard key={index} item={item} />;
          })}
        </MultiItemCarousel>
      </div>
      <div className="md:hidden">
        <SingleItemCarousel slide={false}>
          {newProducts.map((item: any, index: any) => {
            return <ProductCard key={index} item={item} />;
          })}
        </SingleItemCarousel>
      </div>
    </div>
  );
};

export default async function Home() {
  const menWomenCategory: any = await getMenWomenCategory();
  const newProducts: any = await getNewProducts();

  return (
    <div>
      <PromotionalCarrousel />
      <Categories menWomenCategory={menWomenCategory} />
      <NewProducts newProducts={newProducts} />
    </div>
  );
}
