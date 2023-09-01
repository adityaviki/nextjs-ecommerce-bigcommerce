"use client";
import { useState, useEffect, useRef, useTransition } from "react";
import SearchResultBox from "./searchResultBox";
import { searchSmallIcon } from "@/components/icons";
import { getProducts } from "@/lib/actions/search";
import { Product } from "@/lib/types";

const SearchLarge = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const searchProducts = () => {
    setShowSearchBox(true);
    setError("");
    setShowSearchResult(false);
    setSearchResults([] as Product[]);

    startTransition(async () => {
      const queryElement = document.getElementById(
        "search-input-large"
      ) as HTMLInputElement;
      const query = queryElement.value;

      if (!query) {
        setError("Please enter a search query.");
        return;
      }

      const res = await getProducts(query);

      if (res instanceof Error) {
        setError(res.message);
        return;
      }

      setSearchResults(res as Product[]);
      setShowSearchResult(true);
    });
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchProducts();
    }
  };

  const SearchInputBox = () => {
    return (
      <div className="w-full flex gap-2 justify-between p-2 rounded border border-[#DBDADA] h-9">
        <input
          id="search-input-large"
          className="p-0 text-[#202020] border-none focus:ring-0 focus:outline-none w-full"
          type="text"
          onKeyDown={handleEnterKey}
          placeholder="I'm search for"
        />
        <div
          className="active:bg-blue-400 cursor-pointer"
          onClick={() => {
            searchProducts();
          }}
        >
          {searchSmallIcon}
        </div>
      </div>
    );
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setShowSearchBox(false);
    }
  };

  useEffect(() => {
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={searchContainerRef}
      className="relative hidden w-[416px] md:block"
    >
      <SearchInputBox />
      {showSearchBox && (
        <div className="absolute w-[416px] min-h-[400px] border rounded bg-white p-2 z-20 left-0 shadow-md top-[44px]">
          {isPending && (
            <div className="w-full flex items-center justify-center">
              <div className="m-auto animate-spin rounded-full h-6 w-6 border-t-2 border-blue-600"></div>
            </div>
          )}
          {error && <div className="text-red-500 text-base">{error}</div>}
          {showSearchResult && (
            <SearchResultBox searchResults={searchResults} />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchLarge;
