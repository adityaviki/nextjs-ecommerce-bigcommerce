"use client";
import { SearchProduct } from "@/lib/types";
import { closeIcon, searchIcon, searchSmallIcon } from "../icons";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const Search = () => {
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const searchProducts = (id: string) => {
    const searchInput = document.getElementById(id) as HTMLInputElement;
    const query = searchInput.value;

    if (!query || (query && query.length === 0)) return;

    fetch(`/api/search?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setShowSearchResult(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEnterKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.key === "Enter") {
      searchProducts(id);
    }
  };

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

  const SearchInputBox = ({ id }: { id: string }) => {
    return (
      <div className="w-full flex gap-2 justify-between p-2 rounded border border-[#DBDADA] h-9">
        <input
          id={id}
          type="text"
          onKeyDown={(e) => handleEnterKey(e, id)}
          placeholder="I'm search for"
        />
        <div
          className="cursor-pointer active:bg-blue-400"
          onClick={() => searchProducts(id)}
        >
          {searchSmallIcon}
        </div>
      </div>
    );
  };

  const SearchResultBox = () => {
    return (
      <div
        className="p-2 w-full"
        style={{ display: showSearchResult ? "block" : "none" }}
      >
        <div className="font-bold my-4">{results.length} Results</div>
        <div className="flex w-full flex-col gap-3.5">
          {results.slice(0, 3).map((product) => {
            return (
              <ProductSearchCard key={product.entityId} product={product} />
            );
          })}
        </div>
        {results.length > 3 && (
          <div className="text-[#3B4353] mt-4 underline ml-2">
            Show all results
          </div>
        )}
      </div>
    );
  };

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
    setResults([] as SearchProduct[]);
    setShowSearchResult(false);
    const searchInput = document.getElementById(
      "search-input-2"
    ) as HTMLInputElement;
    searchInput.value = "";
  };

  return (
    <div>
      <div className="relative hidden w-[416px] md:block">
        <SearchInputBox id="search-input-1" />
        <div className="absolute bg-white z-20 left-0 w-full shadow-md top-[44px]">
          <SearchResultBox />
        </div>
      </div>
      <div className="md:hidden">
        <div onClick={toggleSearchBox}>
          {showSearchBox ? closeIcon : searchIcon}
        </div>
        <div
          className="fixed left-0 h-full w-screen bg-white px-4 py-2 top[36px]"
          style={{ display: showSearchBox ? "block" : "none" }}
        >
          <SearchInputBox id="search-input-2" />
          <div className="mt-4 bg-white">
            <SearchResultBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
