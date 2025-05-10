"use client";
import React, { useState, useRef } from "react";
import { MockData } from "@/services/MockData/categories";
import clx from "classnames";

type Brand = {
  _id: string;
  name: string;
};

type Subcategory = {
  _id: string;
  name: string;
  types?: Brand[];
  brands?: Brand[];
};

type Category = {
  _id: string;
  name: string;
  subcategories: Subcategory[];
};

type CategoriesNavbarProps = {
  onCategoryClick?: (categoryId: string) => void;
};

const CategoriesNavbar: React.FC<CategoriesNavbarProps> = () => {
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnterCategory = (categoryId: string) => {
    setHoveredCategoryId(categoryId);
    setShowDropdown(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const relatedTarget = e.relatedTarget as Node | null;

    if (
      navbarRef.current &&
      dropdownRef.current &&
      (!relatedTarget || (!navbarRef.current.contains(relatedTarget) && !dropdownRef.current.contains(relatedTarget)))
    ) {
      setHoveredCategoryId(null);
      setShowDropdown(false);
    }
  };

  const selectedCategory = MockData.find((cat) => cat._id === hoveredCategoryId) as Category;

  const renderItems = (subcategories: Subcategory[]) =>
    subcategories.map((subcategory) => (
      <div key={subcategory._id} className="col-span-1 p-4">
        <h3 className="text-lg font-semibold mb-2">{subcategory.name}</h3>

        {subcategory.types && subcategory.types.length > 0 && (
          <div>
            <ul className="text-sm">
              {subcategory.types.map((type) => (
                <li key={type._id}>{type.name}</li>
              ))}
            </ul>
          </div>
        )}

        {subcategory.brands && subcategory.brands.length > 0 && (
          <div className="mt-2">
            <h4 className="font-semibold text-sm">Brands:</h4>
            <ul className="text-sm">
              {subcategory.brands.map((brand) => (
                <li key={brand._id}>{brand.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ));

  return (
    <div className="z-10 relative w-full bg-black text-white  " ref={navbarRef} onMouseLeave={handleMouseLeave}>
      <nav className="w-full bg-black text-white h-12">
        <ul className="flex justify-center px-2 h-full items-center">
          {MockData.map((category) => (
            <li
              key={category._id}
              className="relative h-full"
              onMouseEnter={() => handleMouseEnterCategory(category._id)}
            >
              <button
                className={clx("font-semibold px-2 h-full flex items-center", {
                  "font-bold bg-white text-black": hoveredCategoryId === category._id,
                })}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {showDropdown && selectedCategory && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-1/2 transform -translate-x-1/2 max-w-7xl w-full z-40 transition-all duration-300 ease-in-out"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-6 gap-8 bg-white text-black border-t shadow-md pointer-events-auto rounded-md"
            style={{
              height: "600px",
              display: "grid",
              gridTemplateRows: "repeat(auto, minmax(120px, 1fr))",
              gridAutoRows: "minmax(120px, auto)",
            }}
          >
            <div className="absolute inset-0 w-full h-full bg-transparent pointer-events-none" />
            {renderItems(selectedCategory.subcategories)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesNavbar;
