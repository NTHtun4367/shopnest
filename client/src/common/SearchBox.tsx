import { Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

function SearchBox() {
  const [searchParams] = useSearchParams();

  const initialKeyword = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState(initialKeyword);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateKeywordInUrl(keyword.trim());
  };

  const updateKeywordInUrl = (newKeyword: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newKeyword) {
      newParams.set("keyword", newKeyword);
    } else {
      newParams.delete("keyword");
    }
    const newSearchQuery = newParams.toString();
    const path = newSearchQuery
      ? `/products/filter?${newSearchQuery}`
      : "/products/filter";
    navigate(path, { replace: true });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    if (value === "" && searchParams.get("keyword")) {
      updateKeywordInUrl("");
    }
  };

  const handleClear = () => {
    setKeyword("");
    updateKeywordInUrl("");
  };

  useEffect(() => {
    const urlKeyword = searchParams.get("keyword") || "";
    setKeyword(urlKeyword);
  }, [searchParams]);

  return (
    <div className="w-96 relative">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="bg-gray-200 focus:outline-none ps-10 py-2 w-full text-black text-sm rounded-full"
          value={keyword}
          onChange={handleInputChange}
        />
        <Search className="absolute top-1.5 left-2 text-black" />
        {keyword && (
          <X
            className="absolute top-2 right-2 text-black w-5 h-5 cursor-pointer"
            onClick={handleClear}
          />
        )}
      </form>
    </div>
  );
}

export default SearchBox;
