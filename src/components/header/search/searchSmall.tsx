"use client";
import { Product } from "@/lib/types";
import { closeIcon, searchIcon } from "@/components/icons";
import { useState, useTransition } from "react";
import SearchResultBox from "./searchResultBox";
import { searchSmallIcon } from "@/components/icons";
import { getProducts } from "@/lib/actions/search";

const SearchSmall = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const toggleSearchBox = () => {
    setSearchResults([] as Product[]);
    setShowSearchResult(false);
    setShowSearchBox(!showSearchBox);
    setError("");
  };

  const searchProducts = () => {
    setError("");
    setShowSearchResult(false);

    startTransition(async () => {
      const queryElement = document.getElementById(
        "search-input-small"
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
          id="search-input-small"
          className="p-0 text-[#202020] border-none focus:ring-0 focus:outline-none w-full"
          type="text"
          onKeyDown={handleEnterKey}
          placeholder="I'm searching for..."
        />
        <div
          className="cursor-pointer active:bg-blue-400"
          onClick={() => {
            searchProducts();
          }}
        >
          {searchSmallIcon}
        </div>
      </div>
    );
  };

  return (
    <div className="md:hidden relative">
      <div className="cursor-pointer" onClick={toggleSearchBox}>
        {showSearchBox ? closeIcon : searchIcon}
      </div>
      <div
        className="fixed left-0 h-full w-screen bg-white px-4 py-2 top-[84px]"
        style={{ display: showSearchBox ? "block" : "none" }}
      >
        <SearchInputBox />
        {isPending && (
          <div className="w-full mt-4 flex items-center justify-center">
            <div className="m-auto animate-spin rounded-full h-6 w-6 border-t-2 border-blue-600"></div>
          </div>
        )}
        {error && <div className="text-red-500 text-base mt-4">{error}</div>}
        {showSearchResult && (
          <div className="mt-4 bg-white">
            <SearchResultBox searchResults={searchResults} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSmall;
