import clx from "classnames";

export const signupStyles = {
  container: clx(
    "min-h-screen",
    "bg-[url('/assets/images/login/Login_bg.jpg')] bg-cover bg-center bg-no-repeat min-h-screen",
  ),
  labelStyle: clx("flex flex-row items-center  gap-1 text-sm font-semibold text-gray-60 mb-1"),
  signupMainContentStyle: clx(" px-4 grid grid-cols-12 gap-6"),
  WelcomeMessage: clx("text-3xl font-bold tracking-normal text-left text-gray-90"),
  leftSectionStyle: clx("hidden md:flex md:col-span-6", "flex-col items-start justify-start h-full"),
  leftSectionImg: clx("flex flex-row  items-center justify-center gap-2  min-h-[420px]   w-full"),
  leftSectionHeading: clx("text-[4.5rem] font-extrabold tracking-tighter text-gray-90  mt-12 leading-none"),
  formSection: clx(
    "col-span-12 lg:col-span-6   mx-auto w-full   rounded-lg  border border-solid  border-gray-10 px-4 py-5  bg-white  rounded-lg border border-solid border-gray-30",
  ),
  socialLoginStyle: clx("flex flex-col items-center justify-between w-full gap-3 my-4"),
  selectInput: clx("w-full p-2 border border-gray-300 rounded-lg focus:outline-none text-sm "),
  phoneInput: clx(
    " w-full    flex-grow rounded-lg   flex   border border-solid  bg-transparent outline-none       text-base   transition-colors  disabled:cursor-not-allowed   placeholder:font-light placeholder:text-sm outline-none",
  ),
};
