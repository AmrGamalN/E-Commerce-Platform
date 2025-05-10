"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Toaster from "@/components/UI/Toaster";
// import Providers from "../Providers";
type DashboardWrapperProps = {
  children: React.ReactNode;
};
const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
  const pathname = usePathname();

  const hideNavbarFooterRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/signup/AccountType",
    "/auth/ConfirmEmail",
    "/auth/Otp-Verify",
  ];
  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(pathname);

  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}
      <main>{children}</main>
      <Toaster />
      {!shouldHideNavbarFooter && <Footer />}
    </>
  );
};

export default DashboardWrapper;
