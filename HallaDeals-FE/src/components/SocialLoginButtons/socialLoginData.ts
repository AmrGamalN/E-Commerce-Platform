import { SocialLoginInfo } from "@/components/SocialLoginButtons";
import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export const getDefaultSocialButtons = (handlers: { [key: string]: () => void }): SocialLoginInfo[] => [
  {
    icon: FaFacebookF,
    label: "Continue With Facebook",
    className: "text-sky-600 font-medium",
    onClick: handlers.facebook || (() => {}),
  },
  {
    icon: FcGoogle,
    label: "Continue With Google ",
    className: "text-red-600 font-medium",
    onClick: handlers.google || (() => {}),
  },
];
