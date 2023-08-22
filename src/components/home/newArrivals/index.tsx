import { getNewArriavls } from "@/lib/bigCommerce";
import MultiItemCarousel from "@/components/carousel/multiItemCarousel";

export default async function NewArrivals() {
  const newArrivals: any = await getNewArriavls();
  console.log(newArrivals);
  return newArrivals && newArrivals.length ? (
    <MultiItemCarousel>
      {newArrivals.map((item: any, index: any) => (
        <div
          key={index}
          className="w-64 h-64 basis-auto shrink-0 grow-0 bg-gray-200"
        >
          <img
            className="w-full h-full object-cover"
            src={item.images.url_standard}
            alt={item.name}
          />
        </div>
      ))}
    </MultiItemCarousel>
  ) : null;
}
