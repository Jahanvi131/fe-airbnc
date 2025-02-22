import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PriceRangeInput = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const updateURL = (priceRange) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("minprice", priceRange.min);
    searchParams.set("maxprice", priceRange.max);
    navigate(`/properties?${searchParams.toString()}`);
  };
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000,
  });

  const maxPrice = 1000;

  const handleSliderChange = (e, handle) => {
    const value = Number(e.target.value);
    setPriceRange((prev) => ({
      ...prev,
      [handle]: value,
    }));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const propertyType = searchParams.get("property_type");

    if (
      location.pathname === "/" ||
      (propertyType && location.search.indexOf("&") === -1)
    ) {
      setPriceRange({
        min: 0,
        max: 1000,
      });
    }
  }, [location.search]);

  useEffect(() => {
    updateURL(priceRange);
  }, [priceRange]);

  const leftThumbPosition = (priceRange.min / maxPrice) * 100;
  const rightThumbPosition = (priceRange.max / maxPrice) * 100;

  return (
    <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 ml-6">
      <h3 className="mt-4 text-gray-700">Filter By Price Range</h3>
      <div>
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium">£{priceRange.min}</div>
          <div className="text-lg font-medium">£{priceRange.max}</div>
        </div>
        <div className="relative h-14 flex items-center">
          <div className="absolute w-full h-2 bg-gray-200" />
          <div
            className="absolute h-2 bg-[var(--color-primary)]"
            style={{
              left: `${leftThumbPosition}%`,
              right: `${100 - rightThumbPosition}%`,
            }}
          />
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange.min}
            onChange={(e) => handleSliderChange(e, "min")}
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
            style={{
              "--thumb-size": "1.15rem",
              "--thumb-color": "white",
              "--thumb-border": "2px solid var(--color-primary)",
            }}
          />
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange.max}
            onChange={(e) => handleSliderChange(e, "max")}
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
            style={{
              "--thumb-size": "1.15rem",
              "--thumb-color": "white",
              "--thumb-border": "2px solid var(--color-primary)",
            }}
          />
        </div>
        <style>{`
          input[type="range"] {
            &::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: var(--thumb-size);
              width: var(--thumb-size);
              border-radius: 50%;
              background: var(--thumb-color);
              border: var(--thumb-border);
              pointer-events: auto;
              cursor: pointer;
            }
            &::-moz-range-thumb {
              height: var(--thumb-size);
              width: var(--thumb-size);
              border-radius: 50%;
              background: var(--thumb-color);
              border: var(--thumb-border);
              pointer-events: auto;
              cursor: pointer;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PriceRangeInput;
