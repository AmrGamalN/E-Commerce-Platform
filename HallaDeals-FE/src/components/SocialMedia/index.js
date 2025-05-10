import React from "react";
import { Facebook, Instagram, Twitter, Pinterest } from "../Icons";
import { SocialMediaStyles } from "./classes";
import Link from "next/link";

const socialLinks = (color, links) => {
  return [
    {
      icon: links?.facebook && <Facebook color={color} width="13" height="13" />,
      text: "Facebook",
      url: `https://www.facebook.com/${links?.facebook}/`,
    },
    {
      icon: links?.instagram && <Instagram color={color} width="13" height="13" />,
      text: "Instagram",
      url: `https://www.instagram.com/${links?.instagram}/`,
    },
    {
      icon: links?.twitter && <Twitter color={color} width="13" height="13" />,
      text: "Twitter",
      url: `https://www.twitter.com/${links?.twitter}/`,
    },
    {
      icon: links?.pinterest && <Pinterest color={color} width="13" height="13" />,
      text: "Pinterest",
      url: `https://www.pinterest.com/${links?.pinterest}/`,
    },
  ];
};

const SocialMedia = ({ dark, accounts, aligned }) => {
  return (
    <div className={`{flex mt-5 mb-7 w-48 ${aligned ? "flex sm:flex" : "flex sm:flex-col"}`}>
      {socialLinks(dark ? "#000" : "#fff", accounts).map(
        (item, idx) =>
          item?.icon && (
            <Link
              key={idx}
              href={item?.url ? item.url : "/"}
              className="flex pb-2 pr-4"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={`rounded-full p-2 flex items-center justify-center border border-${
                  dark ? "black" : "white"
                }`}
              >
                {item.icon}
              </div>
              {!aligned && <p className={SocialMediaStyles.socialText}>{item.text}</p>}
            </Link>
          ),
      )}
    </div>
  );
};

export default SocialMedia;
