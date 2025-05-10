import React from "react";
import { Facebook, Instagram, Twitter, Pinterest } from "./Icons";
import Link from "next/link";

// Define the interface for the social media links
interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  pinterest?: string;
}

// Define the props for the SocialMedia component
interface SocialMediaProps {
  dark?: boolean;
  accounts: SocialLinks;
  aligned?: boolean;
  iconSize?: number;
}

// Helper function to generate social media links with icons
const getSocialLinks = (color: string, links: SocialLinks, iconSize: number = 13) => {
  return [
    {
      icon: links?.facebook && <Facebook color={color} width={iconSize} height={iconSize} />,
      text: "Facebook",
      url: `https://www.facebook.com/${links.facebook}/`,
    },
    {
      icon: links?.instagram && <Instagram color={color} width={iconSize} height={iconSize} />,
      text: "Instagram",
      url: `https://www.instagram.com/${links.instagram}/`,
    },
    {
      icon: links?.twitter && <Twitter color={color} width={iconSize} height={iconSize} />,
      text: "Twitter",
      url: `https://www.twitter.com/${links.twitter}/`,
    },
    {
      icon: links?.pinterest && <Pinterest color={color} width={iconSize} height={iconSize} />,
      text: "Pinterest",
      url: `https://www.pinterest.com/${links.pinterest}/`,
    },
  ].filter((item) => item.icon); // Filter out undefined icons
};

// SocialMedia component
const SocialMedia = ({ dark = false, accounts, aligned = false, iconSize = 13 }: SocialMediaProps) => {
  const color = dark ? "#000" : "#fff";
  const socialLinks = getSocialLinks(color, accounts, iconSize);

  return (
    <div className={`flex  ${aligned ? "flex-row items-center" : "flex-col justify-center"}`}>
      {socialLinks.map((item, idx) => (
        <Link
          key={idx}
          href={item.url ? item.url : "/"}
          className="flex items-center   pr-4 hover:opacity-80 transition-opacity"
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={`rounded-full p-2 flex items-center justify-center border ${
              dark ? "border-black" : "border-white"
            }`}
          >
            {item.icon}
          </div>
          {!aligned && <p className={`ml-2 text-sm ${dark ? "text-black" : "text-white"}`}>{item.text}</p>}
        </Link>
      ))}
    </div>
  );
};

export default SocialMedia;
