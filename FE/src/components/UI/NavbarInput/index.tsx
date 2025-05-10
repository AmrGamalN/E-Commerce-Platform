"use client";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Dropdown from "../Dropdown";
import { NavbarInputStyles } from "./classNames";

// Main NavbarInput Component
const NavbarInput = () => {
  const categories: string[] = ["Items", "Members", "Help"];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "Items");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex justify-center">
      <div className="md:w-[600px] w-full">
        <form className="flex relative w-full" action="#">
          {/* Container with grouped border */}
          <div className={NavbarInputStyles.navbarInputContainer}>
            {/* Dropdown for Categories */}
            <div className="h-full px-6 border-r border-gray-20 flex items-center relative">
              <Dropdown
                options={categories}
                selected={selectedCategory}
                onSelect={handleCategorySelect}
                isOpen={isDropdownOpen}
                toggle={toggleDropdown}
              />
            </div>

            {/* Search Input */}
            <input
              className={NavbarInputStyles.inputStyle}
              placeholder={selectedCategory ? `Search in ${selectedCategory}...` : "Search products..."}
              type="text"
              name="search"
              aria-label={selectedCategory ? `Search ${selectedCategory}` : "Search products"}
            />

            {/* Search Button */}
            <button className=" p-2" type="submit" aria-label="Search">
              <CiSearch className="text-xl hover:scale-105 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NavbarInput;
