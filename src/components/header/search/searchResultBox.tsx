"use client";
import { SearchProduct } from "@/lib/types";
import Image from "next/image";

const ProductSearchCard = ({ product }: { product: SearchProduct }) => {
  return (
    <div className="flex gap-4">
      <div className="w-[96px] border shrink-0 grow-0  h-[96px]">
        <Image
          className="w-full h-full object-cover"
          alt={product.name}
          src={product.image}
          width={96}
          height={96}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <div className="text-sm ">{product.brand.toUpperCase()}</div>
        <div className="text-base max-h-[48px] overflow-hidden">
          {product.name}
        </div>
        <div className="font-bold text-[#3B4353]">{product.price}</div>
      </div>
    </div>
  );
};

const SearchResultBox = ({
  searchResults,
}: {
  searchResults: SearchProduct[];
}) => {
  return (
    <div className="w-full">
      <div className="font-bold my-4">{searchResults.length} Results</div>
      <div className="flex w-full flex-col gap-3.5">
        {searchResults.slice(0, 3).map((product) => {
          return <ProductSearchCard key={product.entityId} product={product} />;
        })}
      </div>
      {searchResults.length > 3 && (
        <div className="text-[#3B4353] mt-4 underline ml-2">
          Show all results
        </div>
      )}
    </div>
  );
};

export default SearchResultBox;
