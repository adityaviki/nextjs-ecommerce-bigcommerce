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

  useEffect(() => {
    const container = scrollContainerRef.current;

    container.addEventListener("scroll", () => {
      setLeftScroll(container.scrollLeft > 0);
      setRightScroll(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    });

    return () => {
      container.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <div className="relative">
      <div
        className={`w-full h-[${childrenHeight}px] overflow-hidden relative`}
      >
        <div
          className={`flex gap-4 h-[${
            childrenHeight + 17
          }px] overflow-y-hidden overflow-x-scroll`}
          ref={scrollContainerRef}
        >
          {children}
        </div>
      </div>
      {leftScroll && (
        <div
          className="absolute top-1/2 left-0 md:-left-8 w-8 h-8 cursor-pointer active:bg-blue-500"
          onClick={scrollLeft}
        >
          {leftArrowIcon}
        </div>
      )}
      {rightScroll && (
        <div
          className="w-8 h-8 absolute right-0 top-1/2 md:-right-8 cursor-pointer flex items-center justify-center active:bg-blue-500"
          onClick={scrollRight}
        >
          {rightArrowIcon}
        </div>
      )}
    </div>
  );
};

export default MultiItemCarousel;
