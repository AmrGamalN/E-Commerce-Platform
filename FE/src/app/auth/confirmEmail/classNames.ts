import clx from "classnames";
export const confirmEmailStyls = {
  container: clx("   px-4 pt-8 relative min-h-screen "),
  content: clx("flex flex-col items-center gap-2 justify-center w-full "),
  emailSentContainer: clx("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"),
  checkEmailHeading: clx("capitalize text-gray-80 tracking-tight font-bold text-2xl"),
  emailSent: clx("flex flex-col items-start md:items-center mt-2 w-full px-4 md:px-0"),
  timeLeftCounter: clx(" bg-green-10 px-4  font-bold text-gray-70 mt-4 block rounded-lg"),
};
