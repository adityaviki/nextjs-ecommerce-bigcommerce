"use client";

import React, { useState } from "react";

const ProductVariants = ({ item }: any) => {
  const [image, setImage] = useState(item.images.length ? item.images[0] : "");

  return (
    <div>
      <div className="w-full h-[308px]">
        {image ? (
          <img
            className="w-full h-full object-cover"
            src={image.url_standard}
            alt={item.name}
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>
      <div className="flex p-2 gap-2">
        {[...item.variants.keys()].map((color, index) => {
          const variant = item.variants.get(color);
          return (
            <div
              key={index}
              style={{ backgroundColor: color }}
              className={`w-4 h-4 cursor-pointer`}
              onClick={() => setImage(variant.image_url)}
            />
          );
        })}

        {Array.from(item.variants.values())
          .slice(3)
          .map((variant: any, index) => {
            return (
              <div
                key={index}
                style={{ backgroundColor: variant.color }}
                className={`w-4 h-4 cursor-pointer`}
                onClick={() => setImage(variant.image_url)}
              />
            );
          })}
        {item.variants.size > 3 && (
          <div>{`+${item.variants.size - 3} more`}</div>
        )}
      </div>
    </div>
  );
};

export default ProductVariants;
