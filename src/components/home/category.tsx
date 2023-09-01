import Image from "next/image";

const Category = async () => {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row gap-4">
      <div className="h-[216px] w-full md:flex-1 md:h-[400px] relative">
        <Image
          width={632}
          height={400}
          className="absolute h-full w-full object-cover"
          src="/images/category/men-category.png"
          alt="Men category"
        />
        <div className="absolute w-full text-center top-1/2 -translate-y-1/2 text-[32px] text-white font-bold">
          Shop Men&apos;s
        </div>
      </div>
      <div className="h-[216px] w-full md:flex-1 md:h-[400px] relative">
        <Image
          width={632}
          height={400}
          className="absolute h-full w-full object-cover"
          src="/images/category/women-category.png"
          alt="Men category"
        />
        <div className="absolute w-full text-center top-1/2 -translate-y-1/2 text-[32px] text-white font-bold">
          Shop Women&apos;s
        </div>
      </div>
    </div>
  );
};

export default Category;
