import Cart from "./cart";
import Search from "./search";
import ConfidenceBanner from "./confidenceBanner";
import MenuLarge from "./menuLarge";
import { getMenuItems } from "@/lib/bigCommerce";
import MenuSmall from "./menuSmall";
import { downArrowIcon, flagIcon, heartIcon, profileIcon } from "../icons";
import SearchSmall from "./search/searchSmall";
import SearchLarge from "./search/searchLarge";

const Header = async () => {
  const menuItems = await getMenuItems();
  return (
    <>
      <div className="h-[52px] md:h-[84px] px-4 md:px-8 lg:px-[80px] flex gap-6 items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="md:hidden">
            <MenuSmall menuItems={menuItems} />
          </div>
          <div className="w-[108px] h-[36px] md:w-[150px] md:h-[46px] lg:w-[200px] lg:h-[56px] bg-[#C4C4C4]"></div>
          <div className="md:hidden">{flagIcon}</div>
        </div>
        <SearchLarge />
        <div className="flex items-center gap-6 md:gap-5 lg:gap-11">
          <div className="hidden md:flex items-center h-9 w-[150px] gap-2">
            <div className="whitespace-nowrap">Ship to</div>
            <div className="rounded bg-[#F8F8F9] flex w-[86px] items-center p-2 justify-between">
              <div>{flagIcon}</div>
              <div>{downArrowIcon}</div>
            </div>
          </div>
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
