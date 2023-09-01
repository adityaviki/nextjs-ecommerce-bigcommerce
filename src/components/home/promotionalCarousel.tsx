import SingleItemCarousel from "../carousel/singleItemCarousel";
import Image from "next/image";

const PromotionalCarousel = () => {
  const dummyData = [
    {
      image: "/images/carousel/slide-1.png",
      heading: "Hey EU!",
      text: "We cover all duty and taxes! No unxepected charges on delivery!",
    },
    {
      image: "/images/carousel/slide-2.png",
      heading: "Elevate Your Style",
      text: "Step into a realm of elegance and trends.",
    },
    {
      image: "/images/carousel/slide-3.png",
      heading: "Unleash Your Creativity",
      text: "Express yourself with our versatile and unique fashion pieces.",
    },
  ];

  return (
    <SingleItemCarousel indicatorInside={true}>
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
            <div className="p-[52px] absolute w-[80%] md:w-fit top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 left bg-white opacity-90 text-center">
              <div className="text-[36px] leading-10 md:text-[42px] font-bold text-[#202020] italic">
                {slide.heading}
              </div>
              <div className="text-base md:text-xl lg:text-2xl font-bold text-[#003459] mt-6">
                {slide.text}
              </div>
            </div>
          </div>
        );
      })}
    </SingleItemCarousel>
  );
};

export default PromotionalCarousel;
