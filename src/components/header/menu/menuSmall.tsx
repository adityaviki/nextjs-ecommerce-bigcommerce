"use client";

import {
  menuIcon,
  closeIcon,
  leftArrowSmallIcon,
  rightArrowSmallIcon,
  profileIcon,
  downArrowIcon,
} from "../../icons";
import { useState } from "react";
import AccordionItem from "../../accordionItem";
import { MenuItems } from "@/lib/types";

const MenuSmall = ({ menuItems }: { menuItems: MenuItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subSection, setSubSection] = useState(false);

  interface SectionVisibility {
    sale: boolean;
    brands: boolean;
    men: boolean;
    women: boolean;
    gifts: boolean;
    outlet: boolean;
  }

  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(
    {
      sale: false,
      brands: false,
      men: false,
      women: false,
      gifts: false,
      outlet: false,
    }
  );

  const toggleSection = (section: keyof SectionVisibility) => {
    setSectionVisibility((prevVisibility) => {
      return {
        sale: section === "sale" ? !prevVisibility.sale : false,
        brands: section === "brands" ? !prevVisibility.brands : false,
        men: section === "men" ? !prevVisibility.men : false,
        women: section === "women" ? !prevVisibility.women : false,
        gifts: section === "gifts" ? !prevVisibility.gifts : false,
        outlet: section === "outlet" ? !prevVisibility.outlet : false,
      };
    });
    setSubSection(true);
  };

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const closeAllSections = () => {
    setSectionVisibility({
      sale: false,
      brands: false,
      men: false,
      women: false,
      gifts: false,
      outlet: false,
    });
  };

  const toggleSubSection = () => {
    setSubSection(false);
    closeAllSections();
  };

  const remainingHeight = `calc(100vh - 52px)`;
  const remainingWidth = `calc(100vw - 14px)`;

  const BrandsSection = () => {
    const MenBrands = () => {
      return (
        <div className="grid grid-cols-2">
          {menuItems.brands.map((brand, index: number) => {
            return <div key={index}>{brand.name}</div>;
          })}
        </div>
      );
    };

    const WomenBrands = () => {
      return (
        <div className="grid grid-cols-2">
          {menuItems.brands.map((brand, index: number) => {
            return <div key={index}>{brand.name}</div>;
          })}
        </div>
      );
    };

    return (
      <div>
        <AccordionItem title="Men" content={<MenBrands />} />
        <AccordionItem title="Women" content={<WomenBrands />} />
      </div>
    );
  };

  const MenSection = () => {
    const ShopByProduct = () => {
      return (
        <div className="grid grid-cols-2">
          {menuItems.mensCategories.slice(0, 15).map((category) => {
            return <div key={category.entityId}>{category.name}</div>;
          })}
        </div>
      );
    };

    const Trending = () => {
      return (
        <div>
          <div>New Arrivals</div>
          <div>Blazers</div>
          <div>Coats</div>
          <div>Boots</div>
          <div>Shirts</div>
        </div>
      );
    };

    const TopMenBrands = () => {
      return (
        <div>
          <div>Levi&apos;s</div>
          <div>Alpha Industries</div>
          <div>Baracuta Bass</div>
          <div>Weejuns Ben</div>
          <div>Sherman Birkenstock</div>
        </div>
      );
    };

    return (
      <div>
        <AccordionItem title="Shop by product" content={<ShopByProduct />} />
        <AccordionItem title="Trending" content={<Trending />} />
        <AccordionItem title="Top Men Brands" content={<TopMenBrands />} />
        <div className="mt-2">
          <div className="underline text-[#003459]">Mens Sale</div>
          <div className="underline text-[#003459]">Vouchers</div>
        </div>
      </div>
    );
  };

  const SaleSection = () => {
    return "Sale section";
  };

  const WomenSection = () => {
    return "Women's section";
  };

  const GiftsSection = () => {
    return "Gifts section";
  };

  const OutletSection = () => {
    return "Outlet section";
  };

  const MenuButton = ({
    children,
    section,
  }: {
    children: React.ReactNode;
    section: keyof SectionVisibility;
  }) => {
    return (
      <div
        className={`cursor-pointer py-2 px-6 flex border-b-2 border-[#F8F8F9] text-base w-full items-center justify-between h-10`}
        onClick={() => toggleSection(section)}
      >
        <div>{children}</div>
        <div>{rightArrowSmallIcon}</div>
      </div>
    );
  };

  const MenuCard = ({
    children,
    visible,
    title,
  }: {
    children: React.ReactNode;
    visible: boolean;
    title: string;
  }) => {
    return (
      <div className={`w-full p-4 bg-white ${visible ? "block" : "hidden"}`}>
        <div>
          <div className="text-[#202020] font-bold text-2xl">{title}</div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="cursor-pointer">
        {!subSection && (
          <div onClick={() => toggleMenu()}>
            {menuOpen ? closeIcon : menuIcon}
          </div>
        )}
        {subSection && (
          <div onClick={() => toggleSubSection()}>{leftArrowSmallIcon}</div>
        )}
      </div>
      <div
        className={`fixed overflow-auto bg-white w-full h-full pb-[84px] left-0 top-[84px] ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className={subSection ? "hidden" : "block"}>
          <MenuButton section="sale">Sale</MenuButton>
          <MenuButton section="brands">Brands</MenuButton>
          <MenuButton section="men">Men&apos;s</MenuButton>
          <MenuButton section="women">Women&apos;s</MenuButton>
          <MenuButton section="gifts">Home & Gifts</MenuButton>
          <MenuButton section="outlet">Outlet</MenuButton>
        </div>
        <MenuCard title="Sale" visible={sectionVisibility.sale}>
          <SaleSection />
        </MenuCard>
        <MenuCard title="Brands" visible={sectionVisibility.brands}>
          <BrandsSection />
        </MenuCard>
        <MenuCard title="Men's" visible={sectionVisibility.men}>
          <MenSection />
        </MenuCard>
        <MenuCard title="Women's" visible={sectionVisibility.women}>
          <WomenSection />
        </MenuCard>
        <MenuCard title="Home & Gifts" visible={sectionVisibility.gifts}>
          <GiftsSection />
        </MenuCard>
        <MenuCard title="Outlet" visible={sectionVisibility.outlet}>
          <OutletSection />
        </MenuCard>
        <div className="mt-4 p-4">
          <div className="flex items-center gap-5">
            <div>{profileIcon}</div>
            <div>Log in/Sign up</div>
          </div>
          <div className="mt-[42px] gap-4 grid grid-cols-2">
            <div>Contact</div>
            <div>Sustainability</div>
            <div>Delivery</div>
            <div>Blog</div>
            <div>Returns</div>
            <div>International FAQ</div>
            <div>Tracking / Returns</div>
            <div>Size Guide</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSmall;
