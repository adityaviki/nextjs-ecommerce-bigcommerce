"use client";
import { SearchProduct } from "@/lib/types";
import { closeIcon, searchIcon } from "@/components/icons";
import { useState } from "react";
import SearchResultBox from "./searchResultBox";
import { searchSmallIcon } from "@/components/icons";

const SearchSmall = () => {
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [error, setError] = useState("");

  const toggleSearchBox = () => {
    setSearchResults([] as SearchProduct[]);
    setShowSearchResult(false);
    setShowSearchBox(!showSearchBox);
    setError("");
  };

  const searchProducts = () => {
    setError("");
    setShowSearchResult(false);

    const queryElement = document.getElementById(
      "search-input-small"
    ) as HTMLInputElement;
    const query = queryElement.value;

    if (!query) {
      setError("Please enter a search query.");
      return;
    }
    fetch(`/api/search?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setError("Something went wrong. Please try again later.");
          return;
        }
        setSearchResults(data as SearchProduct[]);
        setShowSearchResult(true);
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong. Please try again later.");
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
          className="p-0 text-[#202020] active:outline-none active:border-none focus:outline-none focus:border-none border-none outline-none w-full"
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
    <div className="md:hidden">
      <div className="cursor-pointer" onClick={toggleSearchBox}>
        {showSearchBox ? closeIcon : searchIcon}
      </div>
      <div
        className="fixed left-0 h-full w-screen bg-white px-4 py-2 top[36px]"
        style={{ display: showSearchBox ? "block" : "none" }}
      >
        <SearchInputBox />
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
