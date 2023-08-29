"use client";

import { MenuItems } from "@/lib/types";
import { useState } from "react";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface SectionVisibility {
  sale: boolean;
  brands: boolean;
  men: boolean;
  women: boolean;
  gifts: boolean;
  outlet: boolean;
}

const MenuLarge = ({ menuItems }: { menuItems: MenuItems }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
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

  const ResponsiveGrid = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-flow-col grid-rows-5">
        {children}
      </div>
    );
  };

  const remainingHeight = `calc(100vh - 92px)`;

  const MenuCard = ({
    children,
    visible,
  }: {
    children: React.ReactNode;
    visible: boolean;
  }) => {
    return (
      <div
        className={`w-full border-b overflow-hidden shadow-md py-16 lg:pl-32 md:pl-16 pr-16 absolute top-[36px] left-0 bg-white z-10 ${
          visible ? "block" : "hidden"
        }`}
        style={{ height: remainingHeight }}
      >
        {children}
      </div>
    );
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
        className={`cursor-pointer whitespace-nowrap flex items-center justify-center h-full px-6 ${
          sectionVisibility[section] ? "bg-[#003459]" : ""
        }`}
        onClick={() => toggleSection(section)}
      >
        {children}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative hidden md:block">
      <div className="flex w-full md:px-4 lg:px-32 text-white items-center justify-between bg-[#202020] md:gap-2 lg:gap-4 h-[36px]">
        <MenuButton section="sale">SALE</MenuButton>
        <MenuButton section="brands">BRANDS</MenuButton>
        <MenuButton section="men">MEN&apos;S</MenuButton>
        <MenuButton section="women">WOMEN&apos;S</MenuButton>
        <MenuButton section="gifts">HOME & GIFTS</MenuButton>
        <MenuButton section="outlet">OUTLET</MenuButton>
      </div>

      <MenuCard visible={sectionVisibility.sale}>Sale Section</MenuCard>
      <MenuCard visible={sectionVisibility.brands}>
        <div className="flex gap-2 h-full w-full">
          <div className="w-2/3 h-full">
            <div className="font-bold text-[#003459]">Men</div>
            <div className="mt-4">
              <ResponsiveGrid>
                {menuItems.brands.slice(0, 15).map((brand) => {
                  return (
                    <div
                      className="whitespace-nowrap overflow-hidden"
                      key={brand.entityId}
                    >
                      {brand.name}
                    </div>
                  );
                })}
              </ResponsiveGrid>
            </div>
            <div className="underline mt-4 text-[#003459]">Shop by all</div>
            <div className="font-bold mt-6 text-[#003459]">Women</div>
            <div className="mt-4">
              <ResponsiveGrid>
                {menuItems.brands.slice(0, 15).map((brand) => {
                  return (
                    <div
                      className="whitespace-nowrap overflow-hidden"
                      key={brand.entityId}
                    >
                      {brand.name}
                    </div>
                  );
                })}
              </ResponsiveGrid>
            </div>
            <div className="underline mt-4 text-[#003459]">Shop by all</div>
          </div>
          <div className="w-1/3 relative h-full">
            <Image
              width={410}
              height={562}
              src="/images/home/menu-item-2.png"
              alt="..."
              className="absolute h-full w-full object-cover"
            />
            <div className="absolute whitespace-nowrap text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold">
              All-30%
            </div>
          </div>
        </div>
      </MenuCard>
      <MenuCard visible={sectionVisibility.men}>
        <div className="flex gap-2 h-full w-full">
          <div className="w-2/3 h-full">
            <div className="font-bold text-[#003459]">Shop by product</div>
            <div className="mt-4">
              <ResponsiveGrid>
                {menuItems.mensCategories.slice(0, 15).map((category) => {
                  return <div key={category.entityId}>{category.name}</div>;
                })}
              </ResponsiveGrid>
            </div>
            <div className="grid grid-cols-3 mt-8 grid-flow-col grid-rows-1">
              <div className="flex flex-col">
                <div className="font-bold text-[#003459] mb-4">Trending</div>
                <div>New Arrivals</div>
                <div>Blazers</div>
                <div>Coats</div>
                <div>Boots</div>
                <div>Shirts</div>
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-[#003459] mb-4">
                  Top Men Brands
                </div>
                <div>Levi&apos;s</div>
                <div>Alpha Industries</div>
                <div>Baracuta Bass</div>
                <div>Weejuns Ben</div>
                <div>Sherman Birkenstock</div>
                <div className="underline mt-4 text-[#003459]">Shop by all</div>
              </div>
              <div className="flex flex-col">
                <div className="underline text-[#003459]">Mens Sale</div>
                <div className="underline text-[#003459]">Vouchers</div>
              </div>
            </div>
          </div>
          <div className="w-1/3 relative h-full">
            <Image
              width={410}
              height={562}
              src="/images/home/menu-item-1.png"
              alt="..."
              className="absolute h-full w-full object-cover"
            />
            <div className="absolute whitespace-nowrap text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold">
              All-30%
            </div>
          </div>
        </div>
      </MenuCard>
      <MenuCard visible={sectionVisibility.women}>
        Women&apos;s Section
      </MenuCard>
      <MenuCard visible={sectionVisibility.gifts}>Gifts Section</MenuCard>
      <MenuCard visible={sectionVisibility.outlet}>Outlet Section</MenuCard>
    </div>
  );
};

export default MenuLarge;
