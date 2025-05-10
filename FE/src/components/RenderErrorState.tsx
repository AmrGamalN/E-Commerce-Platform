import { IoIosWarning } from "react-icons/io";
export const RenderErrorState = () => {
  return (
    <div className="text-red-500 font-medium flex flex-col items-center justify-center">
      <IoIosWarning size={30} />
      <span>Failed to load items. Please try again later.</span>
    </div>
  );
};
