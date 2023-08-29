"use client";
import { SearchProduct } from "@/lib/types";
import { searchSmallIcon } from "@/components/icons";
import { useState } from "react";

const SearchInputBox = ({
  setSearchResults,
  setShowSearchResult,
  setError,
}: {
  setSearchResults: React.Dispatch<React.SetStateAction<SearchProduct[]>>;
  setShowSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [query, setQuery] = useState("");
  const searchProducts = () => {
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
      });
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchProducts();
    }
  };

  return (
    <div className="w-full flex gap-2 justify-between p-2 rounded border border-[#DBDADA] h-9">
      <input
        className="p-0 text-[#202020] active:outline-none active:border-none focus:outline-none focus:border-none border-none outline-none w-full"
        type="text"
        onKeyDown={handleEnterKey}
        placeholder="I'm search for"
        onChange={(e) => {
          setQuery(e.target.value);
          setError("");
        }}
      />
      <div
        className="cursor-pointer active:bg-blue-400"
        onClick={searchProducts}
      >
        {searchSmallIcon}
      </div>
    </div>
  );
};

export default SearchInputBox;
