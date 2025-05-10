import clx from "classnames";
export const OtpInputStyles = {
  container: clx("container mx-auto max-w-md px-4 pt-4"),
  content: clx(" min-h-screen flex flex-col items-center justify-center "),
  verifyHeading: clx("text-2xl font-extrabold text-gray-90 tracking-normal"),
  ResendButton: clx("text-sm font-bold text-gray-90 underline hover:text-gray-70"),
  verifyButton: clx(""),
  timeLeftCounter: clx("font-semibold text-sm text-gray-60 rounded-lg"),
};
