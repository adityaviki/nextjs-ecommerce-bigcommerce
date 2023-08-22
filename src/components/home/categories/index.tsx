import { getTopCategories } from "@/lib/bigCommerce";

export default async function Categories() {
  const categories = await getTopCategories();

  return (
    <div className="flex flex-col items-center justify-center md:flex-row gap-4 p-4">
      {categories.map((category: any, index: number) => (
        <div key={index} className="relative h-[216px] w-[343px]">
          <img
            className="absolute h-[216px] w-[343px] object-cover"
            src={category.image_url}
            alt={category.name}
          />
          <div className="absolute w-full text-center top-1/2 -translate-y-1/2 text-[32px] text-white font-bold">{`Shop ${category.name}`}</div>
        </div>
      ))}
    </div>
  );
}
