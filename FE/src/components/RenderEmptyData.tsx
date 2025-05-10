import { RxValueNone } from "react-icons/rx";

const RenderEmptyData = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 my-4">
      <RxValueNone size={40} className="text-gray-50" />
      <p className="text-lg text-gray-70 font-normal">No items found here </p>
    </div>
  );
};

export default RenderEmptyData;
