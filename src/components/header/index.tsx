"use client";

import Cart from "./cart";
import Search from "./search";
import Menu from "./menu";
import ShippingLocation from "./shippingLocation";
import Banner from "./banner";
import ConfidenceBanner from "./confidenceBanner";

const Header = () => {
  return (
    <div className="flex flex-col">
      <Banner />
      <div className="flex px-4 py-2 gap-6 items-center justify-between">
        <div className="flex items-center gap-6">
          <Menu />
          <svg
            width="108"
            height="36"
            viewBox="0 0 108 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="107.429" height="36" fill="#C4C4C4" />
          </svg>

          <ShippingLocation />
        </div>
        <div className="flex items-center gap-6">
          <Search />
          <Cart />
        </div>
      </div>
      <ConfidenceBanner />
    </div>
  );
};

export default Header;
