import Link from "next/link";
import React from "react";
 
import Image from "next/image";
import { HeaderStyles } from "./classNames";

const Header = () => {
  return (
    <>
      <header className=" mb-10 py-4 px-4">
        <nav className={HeaderStyles.loginNavstyle}>
          <Link href="/" className={`${HeaderStyles.logoStyle} `}>
            <Image
              src="/assets/images/HD_Logo/HD_Logo.png"
              alt="HD Logo"
              width={30}
              height={30}
              style={{ height: "auto", width: "auto" }}
            />
            Halla Deals
          </Link>
          <Link href="/help" className={HeaderStyles.NeedHelpStyle}>
            Need Help?
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
