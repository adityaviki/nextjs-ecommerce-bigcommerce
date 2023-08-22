import Image from "next/image";
import CarouselWrapper from "../carouselWrapper";

export default function PromotionalCarrousel() {
  const slides: any = [
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
      {slides.map((slide: any, index: any) => {
        return (
          <div key={index} className={`w-full relative h-[400px]`}>
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
}
