"use client";

import { Product } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const defaultImage = product.images?.edges[0]?.node?.urlOriginal;
  const alternateImage = product.images?.edges[1]?.node?.urlOriginal;

  const sizeOptions = product.productOptions?.edges.find(
    (edge) => edge?.node?.displayName?.toLocaleLowerCase() === "size"
  );

  const availableSizes = new Map<string, number>();

  sizeOptions?.node?.values?.edges.forEach((edge) => {
    availableSizes.set(
      edge?.node?.label?.toLocaleLowerCase(),
      edge?.node?.entityId
    );
  });

  const colorOptions = product.productOptions?.edges.find(
    (edge) => edge?.node?.displayName?.toLocaleLowerCase() === "color"
  );

  const [selectedColorValueId, setSelectedColorValueId] = useState(
    colorOptions?.node?.values?.edges[0]?.node?.entityId
  );

  const [selectedSizeValueId, setSelectedSizeValueId] = useState<number>();

  const [isHovered, setIsHovered] = useState(false);

  const SizeButton = ({ size }: { size: string }) => {
    return (
      <>
        {availableSizes.has(size) && (
          <div
            className={`p-[1px] border-[#202020] ${
              availableSizes.get(size) === selectedSizeValueId ? "border" : ""
            }`}
          >
            <div
              className="w-9 h-8 cursor-pointer text-xs flex items-center justify-center border border-[#C7C7C7] bg-white text-[#202020]"
              onClick={() => setSelectedSizeValueId(availableSizes.get(size))}
            >
              {size.toLocaleUpperCase()}
            </div>
          </div>
        )}
        {!availableSizes.has(size) && (
          <div className="w-9 h-8 cursor-pointer text-xs flex items-center justify-center border border-[#C7C7C7] bg-[#DBDADA] text-white">
            {size.toLocaleLowerCase()}
          </div>
        )}
      </>
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full flex items-center justify-center"
    >
      <div className="w-[308px] shrink-0 grow-0">
        <div>
          <div className="relative w-[308px] bg-slate-400 h-[308px]">
            {defaultImage && (
              <div className="absolute top-0 left-0">
                <Image
                  width={308}
                  height={308}
                  src={defaultImage}
                  className="w-[308px] h-[308px]"
                  alt="product thumbnail"
                />
              </div>
            )}
            {alternateImage && (
              <div className="absolute top-0 left-0">
                <Image
                  width={308}
                  height={308}
                  src={alternateImage}
                  className="w-[308px] h-[308px]"
                  style={{ display: isHovered ? "block" : "none" }}
                  alt="product thumbnail"
                />
              </div>
            )}
            <div
              className={`absolute bg-white bottom-0 w-full left-0 h-12 opacity-50 ${
                isHovered ? "block" : "hidden"
              }`}
            ></div>
            <div
              className={`absolute bottom-0 left-0 p-2 gap-1 ${
                isHovered ? "flex" : "hidden"
              }`}
            >
              <SizeButton size="xxs" />
              <SizeButton size="xs" />
              <SizeButton size="s" />
              <SizeButton size="m" />
              <SizeButton size="l" />
              <SizeButton size="xl" />
              <SizeButton size="xxl" />
            </div>
          </div>
          <div className="flex py-1 items-center border-b border-[#DBDADA] justify-between">
            <div className="flex gap-2 items-center ">
              {colorOptions?.node?.values?.edges.slice(0, 3).map((value) => {
                return (
                  <div
                    key={value?.node?.entityId}
                    className={`border p-[1px] cursor-pointer ${
                      selectedColorValueId === value?.node?.entityId
                        ? " border-black"
                        : "border-[#DBDADA]"
                    }`}
                    onClick={() =>
                      setSelectedColorValueId(value?.node?.entityId)
                    }
                  >
                    <div
                      style={{ backgroundColor: value?.node?.label }}
                      className="w-3.5 h-3.5"
                    />
                  </div>
                );
              })}
              {colorOptions && colorOptions.node?.values?.edges?.length > 3 && (
                <div className="text-[#3B4353]">
                  +{colorOptions.node?.values?.edges?.length - 3} more
                </div>
              )}
            </div>
            <div
              className="text-xs py-1 px-2 mr-1 rounded bg-[#003459] text-white"
              style={{ display: isHovered ? "block" : "none" }}
            >
              Add to Cart
            </div>
          </div>
        </div>
        <div className="flex mt-2 justify-between">
          <div className="text-[#202020] text-base">{product?.brand?.name}</div>
          <div className="text-[#003459] font-bold text-base">
            {product?.prices?.price?.formatted}
          </div>
        </div>
        <div className="text-[#202020] mt-1 break-all text-sm font-bold h-[44px] overflow-hidden">
          {product?.name}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
