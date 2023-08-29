"use client";

import React, { ReactNode, useRef, useEffect, useState } from "react";
import { leftArrowIcon, rightArrowIcon } from "../icons";

const MultiItemCarousel = ({ children }: { children: ReactNode }) => {
  const scrollContainerRef: any = useRef(null);
  const [childrenHeight, setChildrenHeight] = useState(0);
  const [firstChildWidth, setFirstChildWidth] = useState(0);
  const [leftScroll, setLeftScroll] = useState(false);
  const [rightScroll, setRightScroll] = useState(false);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -firstChildWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: firstChildWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;

      setRightScroll(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
      setChildrenHeight(container.clientHeight);
      setFirstChildWidth(container.firstChild.offsetWidth);
    }
  }, []);

  return (
    <div className="relative">
      <div className={`w-full h-[415px] overflow-hidden relative`}>
        <div
          className={`flex gap-4 h-[435px] overflow-y-hidden overflow-x-scroll`}
          ref={scrollContainerRef}
        >
          {children}
        </div>
      </div>
      <div
        className="w-8 h-8 absolute top-[154px] left-0 md:-left-8 cursor-pointer active:bg-blue-500"
        onClick={() => scrollLeft()}
      >
        <div className="absolute w-8 h-8 bg-white opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {leftArrowIcon}
        </div>
      </div>

      <div
        className="w-8 h-8 absolute right-0 top-[154px] md:-right-8 cursor-pointer active:bg-blue-500"
        onClick={() => scrollRight()}
      >
        <div className="absolute w-8 h-8 bg-white opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {rightArrowIcon}
        </div>
      </div>
    </div>
  );
};

export default MultiItemCarousel;
