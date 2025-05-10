import Link from "next/link";
import Image from "next/image";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center space-y-10 text-center  py-10 px-2">
      {/* Title */}
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-gray-60  tracking-wide">Sorry, page not found ⚠️</h2>
      </div>

      <div className="w-80 h-80 md:w-96 md:h-40  ">
        <Image
          src="/assets/images/notFound/notFound.png"
          alt="Page not found"
          width={800}
          height={800}
          priority
          sizes="800"
          className="object-contain"
        />
      </div>
      <div className="max-w-md mx-auto">
        <p className="text-gray-60 text-lg font-medium">
          We couldn’t find the page you’re looking for. Check the URL or go back to the homepage.
        </p>
      </div>
      {/* Back to Home Button */}
      <Link
        href="/"
        className="flex flex-row items-center justify-center gap-2 px-6 py-3 bg-gray-90 text-white rounded-lg shadow-md hover:bg-gray-70 transition duration-300 text-sm font-medium"
      >
        <FaHome size={18} className="text-white" />
        Back To Home
      </Link>
    </div>
  );
}
