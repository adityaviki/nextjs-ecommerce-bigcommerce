import { getMenWomenCategory } from "@/lib/bigCommerce";
import Image from "next/image";

const MenWomenCategory = async () => {
  const menWomenCategory = await getMenWomenCategory();
  return (
    <div className="flex flex-col items-center justify-center md:flex-row gap-4">
      {menWomenCategory.map((category) => (
        <div
          key={category.entityId}
          className="h-[216px] w-full md:flex-1 md:h-[400px] relative"
        >
          <Image
            width={632}
            height={400}
            className="absolute h-full w-full object-cover"
            src={category.image.urlOriginal}
            alt={category.name}
          />
          <div className="absolute w-full text-center top-1/2 -translate-y-1/2 text-[32px] text-white font-bold">{`Shop ${category.name}`}</div>
        </div>
      ))}
    </div>
  );
};

export default MenWomenCategory;
