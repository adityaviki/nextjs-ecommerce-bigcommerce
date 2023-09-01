"use server";

import Cart from "./cart";
import ConfidenceBanner from "./confidenceBanner";
import MenuLarge from "./menu/menuLarge";
import { getMenuItems, getStoreName } from "@/lib/bigCommerce";
import MenuSmall from "./menu/menuSmall";
import { heartIcon, profileIcon } from "../icons";
import SearchSmall from "./search/searchSmall";
import SearchLarge from "./search/searchLarge";
import ShippingLocation from "./shippingLocation";
import { getShippingLocations } from "@/lib/actions/shippingLocation";
import { getHomePageBanners } from "@/lib/bigCommerce";
import CurrentShippingLocationFlag from "./currentShippingLocationFlag";
const Header = async () => {
  const homePageBanners = await getHomePageBanners();
  const menuItems = await getMenuItems();
  const shippingLocations = getShippingLocations();
  const storeName = await getStoreName();

  return (
    <>
      {homePageBanners?.slice(0, 1).map((content, index) => {
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: content }}
            className="h-8 flex items-center justify-center overflow-hidden shrink-0 grow-0 w-full font-bold bg-[#FFFAF4]"
          ></div>
        );
      })}
      <div className="h-[52px] md:h-[84px] px-4 md:px-8 lg:px-[80px] flex gap-6 items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="md:hidden">
            <MenuSmall menuItems={menuItems} />
          </div>
          <div className="flex justify-center items-center w-[108px] h-[36px] md:w-[150px] md:h-[46px] lg:text-3xl font-bold lg:w-[200px] lg:h-[56px] md:text-xl bg-[#F8F8F9] text-lg ">
            {storeName}
          </div>
          <CurrentShippingLocationFlag shippingLocations={shippingLocations} />
        </div>
        <SearchLarge />
        <div className="flex items-center gap-6 md:gap-5 lg:gap-11">
          <ShippingLocation shippingLocations={shippingLocations} />
          <div className="hidden md:block">{profileIcon}</div>
          <div className="hidden md:block">{heartIcon}</div>
          <SearchSmall />
          <Cart />
        </div>
      </div>
      <MenuLarge menuItems={menuItems} />
      <ConfidenceBanner />
    </>
  );
};

export default Header;
