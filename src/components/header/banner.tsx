"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Banner = () => {
  const pathname: string = usePathname();
  const [data, setData] = useState([]);

  useEffect(() => {
    const firstPart = pathname.split("/")[1];
    const secondPart = pathname.split("/")[2];

    let query = "";

    if (firstPart === "") {
      query = `page=home_page`;
    } else if (firstPart === "category" && secondPart) {
      query = `page=category_page&category=${secondPart}`;
    } else if (firstPart === "brand") {
      query = `page=brand_page&brand=${secondPart}`;
    } else if (firstPart === "search") {
      query = `page=search_page`;
    }

    if (query) {
      fetch(`/api/banners?${query}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pathname]);

  return (
    data.length && (
      <div className="flex flex-col">
        {/* {data.map((banner: BannerType) => {
        return (
          <div
            key={banner.id}
            className="bg-[#FFFAF4] text-xs min-h-[10px] font-bold text-center leading-4 px-2 py-1"
            dangerouslySetInnerHTML={{ __html: banner.content }}
          />
        );
      })} */}
      </div>
    )
  );
};

export default Banner;
