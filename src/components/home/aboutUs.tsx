import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="flex gap-4 md:flex-row md:h-[560px] flex-col mt-12">
      <div className="md:flex-1 md:h-[560px] h-[296px]">
        <Image
          src="/images/home/about-us.png"
          alt="..."
          width={632}
          height={560}
          className="w-full md:h-[560px] h-[296px] object-cover"
        />
      </div>

      <div className="text-center bg-[#F9F9F9] overflow-hidden md:h-[560px] md:text-left md:flex-1 md:p-14 lg:p-24 p-4">
        <div className="text-3xl font-bold text-[#003459]">
          Shop Men’s and Women’s mod & retro clothing
        </div>
        <div className="mt-5 text-[#202020]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum
          mattis placerat aenean pharetra ante pretium. Suspendisse ultrices hac
          quis odio varius sapien amet. Dui neque, adipiscing aliquet dictum
          cursus. Et magna tellus, amet est semper arcu, id viverra nibh. Nunc
          tortor odio tristique tristique eu in sed adipiscing quisque.
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum
          mattis placerat aenean pharetra ante pretium. Suspendisse ultrices hac
          quis odio varius sapien amet. Dui neque, adipiscing aliquet dictum
          cursus. Et magna tellus, amet est semper arcu, id viverra nibh. Nunc
          tortor odio tristique tristique eu in sed adipiscing quisque.
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
