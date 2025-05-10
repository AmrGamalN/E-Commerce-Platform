"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TopBar from "@/layouts/TopBar";
import { CiHeart, CiMenuBurger } from "react-icons/ci";
import { IoNotificationsOutline, IoPersonOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { NavbarStyles } from "./classNames";
import { NavIconsProps, NavItem } from "@/types/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import NavbarInput from "@/components/UI/NavbarInput";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Skeleton } from "@/components/UI/skeleton";

const NavIcons = ({ items }: NavIconsProps) => (
  <ul className="flex items-center text-gray-600 lg:gap-4">
    {items.map((item, index) => (
      <li key={index} className="p-2 rounded-full hover:bg-gray-20 cursor-pointer transition-all">
        <item.icon size={24} onClick={item.onClick ? item.onClick : undefined} />
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const { user, isLoading } = useUserStore();
  const { logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State for toggling the profile menu
  const isLoggedIn = !!user;
  const navItems: NavItem[] = [
    { icon: AiOutlineMessage },
    { icon: IoNotificationsOutline },
    { icon: CiHeart },
    { icon: IoPersonOutline, onClick: () => setIsProfileMenuOpen(!isProfileMenuOpen) },
  ];
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="sticky top-0 z-20 bg-white">
      {/* Top Bar */}
      <TopBar />

      <div className="flex items-center gap-4 flex-wrap justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className={NavbarStyles.navbarLogo}>
          <Image
            src="/assets/images/HD_Logo/HD_Logo.png"
            alt="HD Logo"
            width={20}
            height={20}
            style={{ height: "auto", width: "auto" }}
          />
          <h1 className="text-lg tracking-tight font-bold text-gray-80 mt-1"> Halla Deals</h1>
        </Link>

        {/* Icons and Sell Button */}
        <div className="flex items-center gap-4 lg:gap-6 lg:order-2 ">
          {isLoading ? (
            <div className="skeleton-container flex">
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ) : !isLoggedIn ? (
            // Display "Sign Up" and "Login" if user is not logged in
            <>
              <button onClick={() => router.push("/auth/signup/AccountType")}>Sign Up</button>
              <button onClick={() => router.push("/auth/login")}>Login</button>
            </>
          ) : (
            // Display regular icons if user is logged in
            <>
              <NavIcons items={navItems} />
              <div className="relative">
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-6 w-48 bg-white border rounded shadow-lg z-10">
                    <ul>
                      <li
                        className="p-2 cursor-pointer hover:bg-gray-100 hover:text-white"
                        onClick={() => router.push(`/profile/${user?.userId}`)}
                      >
                        Profile
                      </li>
                      <li className="p-2 cursor-pointer hover:bg-gray-100 hover:text-white" onClick={handleLogout}>
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
          <Link href="/Items/New-Item" className={NavbarStyles.sellNowStyle}>
            Sell now
          </Link>
          <CiMenuBurger size={30} className="block lg:hidden" />
        </div>

        <NavbarInput />
      </div>
    </div>
  );
};

export default Navbar;
