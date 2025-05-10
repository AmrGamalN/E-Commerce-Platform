import clx from "classnames";
export const InputOTPStyles = {
  container: clx(
    "relative flex h-10 w-10 items-center justify-center  text-base text-gray-80 font-semibold  border border-solid  rounded-lg transition-all ",
  ),
  hasFakeCaretStyleParent: clx("pointer-events-none absolute inset-0 flex items-center justify-center"),
};
