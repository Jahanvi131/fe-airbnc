import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SortDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("popularity");

  const updateURL = (sortValue) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("sort", sortValue);
    navigate(`/properties?${searchParams.toString()}`);
  };

  const sortOptions = [
    { value: "popularity", label: "Most Popular" },
    { value: "price_low_high", label: "Price: Low to High" },
    { value: "price_high_low", label: "Price: High to Low" },
  ];

  const handleSelect = (value) => {
    setSelectedSort(value);
    setIsOpen(false);
  };

  useEffect(() => {
    updateURL(selectedSort);
  }, [selectedSort]);

  return (
    <div className="relative ml-6 mr-6">
      <h3 className="mt-4 text-gray-700">Sort By</h3>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-48 px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50 focus:outline-none"
      >
        <span>
          {sortOptions.find((option) => option.value === selectedSort)?.label}
        </span>
        <span className="ml-2">▼</span>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-48 mt-1 bg-white border rounded-lg shadow-lg">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                selectedSort === option.value
                  ? "bg-gray-50 text-gray-700 font-medium"
                  : "text-gray-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
