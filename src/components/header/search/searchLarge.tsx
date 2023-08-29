"use client";
import { SearchProduct } from "@/lib/types";
import { useState, useEffect, useRef } from "react";
import SearchResultBox from "./searchResultBox";
import { searchSmallIcon } from "@/components/icons";

const SearchLarge = () => {
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const clearSearchResults = () => {
    setError("");
    setShowSearchResult(false);
    setShowSearchBox(false);
    setSearchResults([] as SearchProduct[]);
  };

  const searchProducts = () => {
    clearSearchResults();
    const queryElement = document.getElementById(
      "search-input-large"
    ) as HTMLInputElement;
    const query = queryElement.value;

    if (!query) {
      setError("Please enter a search query.");
      setShowSearchBox(true);
      return;
    }

    fetch(`/api/search?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setError("Something went wrong. Please try again later.");
          setShowSearchBox(true);
          return;
        }
        setSearchResults(data as SearchProduct[]);
        setShowSearchResult(true);
        setShowSearchBox(true);
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong. Please try again later.");
        setShowSearchBox(true);
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
          className="p-0 text-[#202020] active:outline-none active:border-none focus:outline-none focus:border-none border-none outline-none w-full"
          type="text"
          onKeyDown={handleEnterKey}
          placeholder="I'm search for"
        />
        <div
          className="active:bg-blue-400"
          onClick={(e) => {
            searchProducts();
          }}
        >
          {searchSmallIcon}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        console.log("clicked outside");

        clearSearchResults();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchContainerRef}
      className="relative hidden w-[416px] md:block"
    >
      <SearchInputBox />
      {showSearchBox && (
        <div className="absolute w-[416px] border rounded bg-white p-2 z-20 left-0 shadow-md top-[44px]">
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
