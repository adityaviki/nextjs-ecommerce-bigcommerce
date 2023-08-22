import Image from "next/image";
import CarouselWrapper from "@/components/carouselWrapper";
import MultiItemCarousel from "@/components/carousel/multiItemCarousel";
import { getNewArriavls, getMenWomenCategory } from "@/lib/bigCommerce";

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
    <CarouselWrapper>
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
    </CarouselWrapper>
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

const NewArrivals = ({ newArrivals }: any) => {
  if (!newArrivals || !newArrivals.length) return null;

  return (
    <div className="mt-12">
      <div className="text-center text-[32px] mb-4 font-bold">New Arrivals</div>
      <MultiItemCarousel>
        {newArrivals.map((item: any, index: any) => (
          <div key={index} className="basis-auto shrink-0 grow-0 bg-gray-200">
            <img
              className="w-[308px] h-[308px]"
              src={item.images.url_standard}
              alt={item.name}
            />
          </div>
        ))}
      </MultiItemCarousel>
    </div>
  );
};

export default async function Home() {
  const menWomenCategory: any = await getMenWomenCategory();
  const newArrivals: any = await getNewArriavls();

  return (
    <div>
      <PromotionalCarrousel />
      <Categories menWomenCategory={menWomenCategory} />
      {/* <NewArrivals newArrivals={newArrivals} /> */}
    </div>
  );
}
