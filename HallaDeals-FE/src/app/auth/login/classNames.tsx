import clx from "classnames";

export const loginStyles = {
  container: clx(
    "min-h-screen",
    "bg-[url('/assets/images/login/Login_bg.jpg')] bg-cover bg-center bg-no-repeat min-h-screen",
  ),

  WelcomeMessage: clx("text-3xl font-bold tracking-normal text-left text-gray-90"),

  labelStyle: clx("flex flex-row items-center gap-1 mb-1", "text-sm font-semibold text-gray-60"),

  formStyle: clx("w-full flex flex-col items-center justify-center gap-3 rounded-lg"),

  // Login choice container (e.g., phone/email tabs)
  loginChoice: clx(
    "flex flex-col md:flex-row items-center justify-between w-full",
    "gap-4 mb-6  overflow-hidden  capitalize",
  ),

  // Each choice button
  LoginChoiceBtn: clx(
    "flex items-center justify-start gap-2 px-2 py-3 w-full font-bold capitalize border border-gray-30  !rounded-full ",
  ),

  // Phone input field
  phoneInput: clx(
    "w-full flex-grow border border-gray-300 rounded-lg bg-transparent",
    "flex items-center text-base placeholder:text-sm placeholder:font-light",
    "transition-colors outline-none disabled:cursor-not-allowed",
  ),

  // Layout Grid
  loginMainContent: clx("grid grid-cols-12 px-4"),

  // Left visual section
  leftSectionStyle: clx("hidden md:flex md:col-span-6", "flex-col items-start justify-start h-full"),
  leftSectionImg: clx("flex flex-row  items-center justify-center gap-2  min-h-[420px]   w-full"),
  leftSectionHeading: clx("text-[4.5rem] font-extrabold tracking-tighter text-gray-90  mt-12 leading-none"),
  // Right login form section
  rightSectionStyle: clx("col-span-12 md:col-span-6", "mx-auto w-full max-w-md p-6 bg-white rounded-lg my-3 h-fit"),

  forgetPassword: clx(
    "flex justify-end w-full text-sm font-semibold text-gray-700",
    "hover:underline hover:text-gray-800 ml-1 my-2",
  ),

  // Social login buttons container
  socialLoginStyle: clx("flex flex-col items-center justify-between w-full gap-1"),

  signUpLink: clx("underline ml-1 transition-all duration-300 ease-in-out", "hover:text-gray-600 hover:underline"),
};
