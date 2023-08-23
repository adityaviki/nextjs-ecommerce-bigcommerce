"use client";

import type { CustomFlowbiteTheme } from "flowbite-react";
import { Carousel } from "flowbite-react";
import { leftArrowIcon, rightArrowIcon } from "../icons";

export function controlBase(icon: React.ReactNode) {
  return (
    <div className="w-8 h-8 relative cursor-pointer active:bg-blue-500">
      <div className="absolute w-8 h-8 bg-white opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {icon}
      </div>
    </div>
  );
}

const LeftControl = controlBase(leftArrowIcon);
const RightControl = controlBase(rightArrowIcon);

export default function SingleItemCarousel({
  children,
  slide = true,
}: {
  children: React.ReactNode;
  slide?: boolean;
}) {
  const customTheme: CustomFlowbiteTheme["carousel"] = {
    root: {
      base: "relative h-full w-full mb-12",
      leftControl:
        "absolute top-0 left-0 md:-left-8 flex h-full items-center justify-center focus:outline-none",
      rightControl:
        "absolute top-0 right-0 md:-right-8 flex h-full items-center justify-center focus:outline-none",
    },
    indicators: {
      active: {
        off: "bg-white hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
        on: "bg-[#003459] dark:bg-gray-800",
      },
      base: "h-2 w-2 rounded-full border border-[#003459]",
      wrapper: "absolute gap-4 -bottom-6 flex w-full justify-center",
    },
    item: {
      base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
      wrapper: "w-full flex-shrink-0 transform cursor-grab snap-center",
    },
    control: {
      base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-50 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
      icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6",
    },
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
      snap: "snap-x",
    },
  };

  return (
    <Carousel
      slide={slide}
      leftControl={LeftControl}
      rightControl={RightControl}
      theme={customTheme}
    >
      {children}
    </Carousel>
  );
}
