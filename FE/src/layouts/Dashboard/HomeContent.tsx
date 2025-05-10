"use client";
import React from "react";
import ItemsChoice from "@/containers/ItemsChoice";
import clx from "classnames";
import CategoriesNavbar from "@/components/navigation/CategoriesNavbar";
// import Sidebar from "@/components/navigation/Sidebar";
// import MainContent from "@/components/navigation";

const styles = {
  wrapper: clx("min-h:80vh sm:pb-2.5 md:pb-5"),
  section: ({ isHero, fillMobile }: { isHero?: boolean; fillMobile?: boolean }) =>
    clx("mb-7.5", { "px-5": !isHero && !fillMobile }, { "sm:px-7.5 lg:px-11.5": !isHero }),
  heading: clx("font-cond font-semibold text-center mb-5 tracking-[2px] text-2xl sm:text-3xl md:text-4xl"),
  heroBanner: clx(
    "relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center text-center text-black",
  ),
};

const HomeContent: React.FC = () => {
  const [, setActiveCategoryId] = React.useState<string | null>(null);

  return (
    <div className={styles.wrapper}>
      {/* Navigation categories */}
      <CategoriesNavbar onCategoryClick={(categoryId) => setActiveCategoryId(categoryId)} />
      {/* Hero Banner */}
      <div
        className={styles.heroBanner}
        style={{
          backgroundImage: "url('/assets/images/hero-banner-HD.png')",
        }}
      >
        <div className="absolute top-[25%] bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-white text-4xl font-bold">Don&#39;t use it? Sell it!</h1>
        </div>
      </div>

      {/* Sections with items */}
      <HomeSection heading="Electronics" fillMobile>
        <ItemsChoice title="Electronics" endPoint="Electronics" />
      </HomeSection>

      <HomeSection heading="Clothes" fillMobile>
        <ItemsChoice title="Clothes" endPoint="clothes" />
      </HomeSection>

      <HomeSection heading="Shoes" fillMobile>
        <ItemsChoice title="Shoes" endPoint="shoes" />
      </HomeSection>
    </div>
  );
};

const HomeSection: React.FC<{
  heading?: string;
  isHero?: boolean;
  fillMobile?: boolean;
  children: React.ReactNode;
}> = ({ heading, isHero = false, fillMobile = false, children }) => {
  return (
    <div className={`mb-10 px-5 ${!isHero && !fillMobile ? "px-5 sm:px-10 lg:px-20" : ""}`}>
      {heading && <h5 className={styles.heading}>{heading}</h5>}
      {children}
    </div>
  );
};

export default HomeContent;
