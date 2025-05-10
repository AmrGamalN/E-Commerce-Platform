"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { TbWorldCancel } from "react-icons/tb";
import ReactCountryFlag from "react-country-flag";
import Dropdown from "@/components/UI/Dropdown";
import { TopBarStyles } from "./classNames";
import Paragraph from "@/components/UI/Paragraph";

const TopBar = () => {
  const [showLanguages, setShowLanguages] = useState(false); // Toggle show/hide languages dropdown
  const [showCurrency, setShowCurrency] = useState(false); // Toggle show/hide currency dropdown
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  // type of languages
  type Languages = {
    code: string;
    name: string;
    countryCode: string;
  };
  // Languages array
  const languages: Languages[] = [
    {
      code: "SA",
      name: "العربية",
      countryCode: "SA",
    },
    {
      code: "GB",
      name: "English",
      countryCode: "GB",
    },
  ];
  // Currency options
  const currencies: string[] = ["USD", "EGP", "EUR"];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-dropdown") && !target.closest(".currency-dropdown")) {
        setShowLanguages(false);
        setShowCurrency(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle currency selection
  const handleCurrencySelect = useCallback((currency: string) => {
    setSelectedCurrency(currency);
    setShowCurrency(false);
  }, []);

  return (
    <div className={TopBarStyles.topBarContainer}>
      {/* Left Side Links */}
      <div>
        <ul className="flex items-center gap-4 font-medium text-sm text-gray-40">
          <li>
            <Link href="/FAQ" className="hover:underline hover:text-gray-30 transition-colors duration-200">
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/help" className="hover:underline hover:text-gray-20 transition-colors duration-200">
              Help?
            </Link>
          </li>
        </ul>
      </div>

      {/* Middle Slogan */}
      <div className="text-sm text-gray-30 hidden lg:block">
        <Paragraph size="sm" color="light" align="center">
          Discover amazing deals with good quality in one place 😊
        </Paragraph>
      </div>

      {/* Right Side Links */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <div className="relative language-dropdown">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowLanguages((prev) => !prev);
              setShowCurrency(false); // Close currency dropdown if open
            }}
            className={TopBarStyles.languageSelectorIcon}
            aria-expanded={showLanguages}
          >
            <TbWorldCancel size={20} />
          </button>

          {/* Language Dropdown Menu */}
          {showLanguages && (
            <ul className={TopBarStyles.languagesDropDownUl}>
              {languages.map((language) => (
                <li
                  key={language.code}
                  className={TopBarStyles.languagesDropDownli}
                  onClick={() => {
                    setShowLanguages(false);
                  }}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
                    <ReactCountryFlag
                      countryCode={language.countryCode}
                      svg
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <span>{language.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Currency Selector */}
        <div className="relative currency-dropdown">
          <Dropdown
            options={currencies}
            selected={selectedCurrency}
            onSelect={handleCurrencySelect}
            isOpen={showCurrency}
            toggle={() => {
              setShowCurrency((prev) => !prev);
              setShowLanguages(false); // Close language dropdown if open
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
