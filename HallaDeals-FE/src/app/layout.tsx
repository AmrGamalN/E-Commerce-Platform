// Renders header and footer globally
import { Manrope } from "next/font/google";
import "../styles/main.css";
import DashboardWrapper from "@/layouts/Dashboard/DashboardWrapper";
import Providers from "@/layouts/Providers";

const manrope = Manrope({
  subsets: ["latin"], // Specify the character subsets you need
  weight: ["400", "500", "600", "700"], // Specify the font weights you need
  variable: "--font-manrope", // Optional: Define a CSS variable for the font
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.className}>
      <body>
        <Providers>
          <DashboardWrapper>{children}</DashboardWrapper> {/* ✅ Wrap children */}
        </Providers>
      </body>
    </html>
  );
}
