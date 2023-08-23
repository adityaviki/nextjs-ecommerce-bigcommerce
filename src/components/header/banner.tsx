"use client";

import { useBanners } from "@/lib/hooks";
import { usePathname } from "next/navigation";

const Banner = () => {
  const pathname: string = usePathname();

  const { data, error } = useBanners(pathname);

  return data && data.length > 0 ? (
    <div className="flex flex-col">
      {data.map((banner: BannerType) => {
        return (
          <div
            key={banner.id}
            className="bg-[#FFFAF4] text-xs min-h-[10px] font-bold text-center leading-4 px-2 py-1"
            dangerouslySetInnerHTML={{ __html: banner.content }}
          />
        );
      })}
    </div>
  ) : null;
};

export default Banner;
