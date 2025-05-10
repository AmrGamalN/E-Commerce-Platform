"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
 
import Image from "next/image";
import Button from "@/components/UI/Button";
import { accountTypeStyles } from "./classNames";
import { AccountTypeMsg } from "@/constants/content";
import Header from "@/components/Header";

const AccountType = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const router = useRouter();

  const accountType = [
    {
      id: 1,
      title: "personal",
      description: "Unlock a seamless shopping experience. Enjoy exclusive deals and personalized recommendations!",
      img: "/assets/images/Register/Individual.png",
    },
    {
      id: 2,
      title: "business",
      description: "Grow your business, reach thousands of customers, and boost your sales effortlessly!",
      img: "/assets/images/Register/Business.png",
    },
  ];
  // navigate to signup page with  select type
  const handleNext = () => {
    if (selectedType) {
      router.push(`/auth/signup?accountType=${encodeURIComponent(selectedType)}`);
    }
  };
  return (
    <>
      <Header />
      <div className={accountTypeStyles.container}>
        {/* Left Section */}
        <div className={accountTypeStyles.leftSction}>
          <div>
            <h1 className={accountTypeStyles.leftSectionmainHeading}>Join us Now 😊</h1>
            <p className="text-sm font-semibold text-gray-70 mb-4">{AccountTypeMsg}</p>
          </div>
          <div className={accountTypeStyles.leftSectionImg}>
            <Image
              src="/assets/images/HD_Logo/HD_Logo.png"
              alt="HD Logo"
              width={180}
              height={180}
              priority
              className="object-contain"
            />
            <h2 className={accountTypeStyles.leftSectionHeading}>Halla Deals</h2>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="md:col-span-6 col-span-12 mt-6 ">
          <h1 className={accountTypeStyles.rightSectionHeading}>Please select how you want to join us</h1>
          <div className="flex flex-col items-start gap-10 w-full">
            {accountType.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedType(item.title)}
                className={`${accountTypeStyles.accountTypeSection} ${
                  selectedType === item.title ? "bg-green-10" : ""
                }`}
              >
                {/* Circular Selection Indicator */}
                <div className="flex items-start gap-2">
                  <div
                    className={` ${accountTypeStyles.checkBoxStyle}
                    ${selectedType === item.title ? "border-darkgreen bg-darkgreen" : "border-gray-300 bg-white"}`}
                  >
                    {selectedType === item.title && <div className="w-2 h-2 bg-white rounded-lg "></div>}
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-80 tracking-normal capitalize">{item.title}</h2>
                    <p className="text-xs font-semibold text-gray-70">{item.description}</p>
                  </div>
                </div>

                <div className="relative w-[80px] h-[80px] hidden md:block">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50px, 80px"
                  />
                </div>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="btn-primary"
            size="lg"
            className="w-full my-6 text-base"
            disabled={!selectedType}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default AccountType;
