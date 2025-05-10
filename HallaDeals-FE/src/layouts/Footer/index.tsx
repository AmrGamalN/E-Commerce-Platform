import Image from "next/image";
import Link from "next/link";
import { contactDetails, FooterLink, FooterSectionProps, PaymentOption, PaymentOptionsProps } from "@/types/footer";
// Import icons
import { MdEmail, MdOutlineSupportAgent } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";

// Import images
// import Hd_Logo from "public/assets/images/Hd_Logo/HD_Logo.webp";
// --------------- import payments imags
import applepayImg from "public/assets/images/payments_options_Footer/applePay.svg";
import masterCardImg from "public/assets/images/payments_options_Footer/mastercard.svg";
import VisaImg from "public/assets/images/payments_options_Footer/Visa.svg";
import instapayImg from "public/assets/images/payments_options_Footer/instapay.svg";
import { FooterStyles } from "./classNames";
import SocialMedia from "@/components/SocialMedia";
import { HD_ADDRESS, HD_EMAIL, HD_FACEBOOK, HD_INSTA, HD_PHONE, HD_PINTERST, HD_TWITER } from "@/constants/content";
import Paragraph from "@/components/UI/Paragraph";

const categories: FooterLink[] = [
  { href: "/shop/Home", label: "Home & Garden" },
  { href: "/shop/sports", label: "Sports & Outdoors" },
  { href: "/shop/Fashion", label: "Fashion" },
  { href: "/shop/Electronics", label: "Electronics" },
  { href: "/shop/Cars", label: "Cars" },
  { href: "/shop/Clothes", label: "Clothes" },
  { href: "/shop/Shoes", label: "Shoes" },
];

const accountLinks: FooterLink[] = [
  { href: "/Account", label: "My Account" },
  { href: "/Register", label: "Login & Register" },
  { href: "/Wishlist", label: "Wishlist" },
  { href: "/Message", label: "Message" },
  { href: "/Notifications", label: "Notifications" },
];

const quickLinks: FooterLink[] = [
  { href: "/home", label: "Our Story" },
  { href: "/sports", label: "Why Us" },
  { href: "/fashion", label: "Privacy Policy" },
  { href: "/Terms", label: "Terms Of Use" },
  { href: "/FAQ", label: "FAQ" },
  { href: "/Contact", label: "Contact" },
];

const helpLinks: FooterLink[] = [
  { href: "/home", label: "🎧 Help Center" },
  { href: "/sports", label: "Selling" },
  { href: "/fashion", label: "Buying" },
  { href: "/electronics", label: "Trust and Safety" },
];
const contactDetailsInfo: contactDetails[] = [
  {
    icon: FaLocationDot,
    href: "",
    text: HD_ADDRESS,
    ariaLabel: "View address on Google Maps",
    target: "_blank",
  },
  {
    icon: MdEmail,
    href: `mailto:${HD_EMAIL}`,
    text: HD_EMAIL,
    ariaLabel: "Send an email",
  },
  {
    icon: MdOutlineSupportAgent,
    href: `tel:${HD_PHONE}`,
    text: HD_PHONE,
    ariaLabel: "Call us",
  },
];
const paymentOptions: PaymentOption[] = [
  { image: instapayImg, alt: "Instapay" },
  { image: applepayImg, alt: "Apple Pay" },
  { image: masterCardImg, alt: "Mastercard" },
  { image: VisaImg, alt: "Visa" },
];

const FooterSection = ({ title, links }: FooterSectionProps) => (
  <div className="space-y-2 md:space-y-6">
    <h2 className="text-md font-medium text-gray-50 text-xl">{title}</h2>
    <ul className="space-y-2">
      {links?.map((link) => (
        <li key={link.href}>
          <Link href={link?.href || "/"} className="text-gray-20 text-xs md:text-sm hover:text-gray-50 transition">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const PaymentOptions = ({ options }: PaymentOptionsProps) => (
  <div className="flex flex-row items-center justify-center gap-2">
    {options.map((option, index) => (
      <div className={FooterStyles.FooterPayments} key={index}>
        <Image src={option.image} alt={option.alt} fill className="p-1" />
      </div>
    ))}
  </div>
);
const Footer = () => {
  const accounts: Record<string, string> = {
    facebook: HD_FACEBOOK,
    twitter: HD_TWITER,
    instagram: HD_INSTA,
    pinterest: HD_PINTERST,
  };

  return (
    <footer className="bg-gray-100 rounded-xl mt-10">
      <div className="container py-10">
        {/* Logo, Description, and Social Icons */}
        <div className={FooterStyles.footerLogoDescription}>
          {/* Logo & Description */}
          <div className="flex flex-col items-start">
            <div>
              <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
                <div className="relative  ">
                  <Image
                    src="/assets/images/HD_Logo/HD_Logo.png"
                    alt="HD Logo"
                    width={30}
                    height={30}
                    style={{ height: "auto", width: "auto" }}
                  />
                </div>
                <span className="text-2xl font-normal text-gray-40">HallaDeals</span>
              </Link>
              <p className="text-gray-50 text-md font-medium leading-6 my-1"></p>

              <Paragraph size="sm" color="lightGray" align="left">
                Discover amazing deals with good quality in one place!
                <br /> From fashion to electronics, find what you need at prices you’ll love.
              </Paragraph>
            </div>
            {/* Subscribe to our newsletter */}
            <div className="flex flex-col items-start justify-start gap-4 mt-8">
              <form className={FooterStyles.footerForm}>
                <input type="email" required placeholder="Your e-mail" className={FooterStyles.footerFormInput} />
                <button type="submit" className={FooterStyles.footerFormButton}>
                  Send
                  <GoArrowRight size={16} className="group-hover:translate-x-2 transition" />
                </button>
              </form>
              <Paragraph size="sm" color="lightGray" align="left">
                Subscribe to our newsletter to receive our weekly feed.
              </Paragraph>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-row items-center  gap-4 ">
            <h2 className="text-gray-40 font-medium md:text-2xl text-sm mb-4">Follow Us</h2>
            <SocialMedia accounts={accounts} dark={undefined} aligned={true} />
          </div>
        </div>

        {/* Grid for Footer Sections */}
        <div className={FooterStyles.footerContent}>
          <FooterSection title="Categories" links={categories} />
          <FooterSection title="Account" links={accountLinks} />
          <FooterSection title="Quick Link" links={quickLinks} />
          <FooterSection title="Help" links={helpLinks} />

          {/* Contact Us */}
          <div className="space-y-2 md:space-y-6">
            <h3 className="text-md font-medium text-gray-50 text-xl">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              {contactDetailsInfo.map((contact, index) => (
                <li key={index} className={FooterStyles.contactDetailsli}>
                  <contact.icon size={22} className="text-gray-30" />
                  <Link
                    href={contact?.href ? contact.href : "/"}
                    target={contact.target}
                    className="hover:underline"
                    aria-label={contact.ariaLabel}
                  >
                    {contact.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright and Accept Payment */}
        <div className={FooterStyles.footerBottomContainer}>
          <div>
            <p className="text-gray-50 text-sm md:text-md font-normal">
              &copy; {new Date().getFullYear()} Halla Deals. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm font-normal items-center lg:items-start">
            <h4 className="text-gray-50   font-medium">Accept payments</h4>
            <PaymentOptions options={paymentOptions} />
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
