"use client";
import { Product } from "@/lib/types";
import Image from "next/image";
import { GlobalContext } from "@/context/globalProviderModal";
import { useContext } from "react";
import getSymbolFromCurrency from "currency-symbol-map";

const ProductSearchCard = ({ product }: { product: Product }) => {
  const { activeCurrency } = useContext(GlobalContext);
  return (
    <div className="flex gap-4">
      <div className="w-[96px] border shrink-0 grow-0  h-[96px]">
        <Image
          className="w-full h-full object-cover"
          alt={product.name}
          src={product.defaultImage?.urlOriginal}
          width={96}
          height={96}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <div className="text-sm ">{product?.brand?.name?.toUpperCase()}</div>
        <div className="text-base max-h-[48px] overflow-hidden">
          {product.name}
        </div>
        <div className="font-bold text-[#3B4353]">
          {getSymbolFromCurrency(activeCurrency?.code || "")}{" "}
          {(
            product?.prices?.price?.value * (activeCurrency?.exchangeRate || 1)
          ).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

const SearchResultBox = ({ searchResults }: { searchResults: Product[] }) => {
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
