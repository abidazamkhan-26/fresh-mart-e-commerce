import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const PoductBannerItem = ({ bg, children }) => {
  return (
    <div
      className={`p-4 sm:p-5 md:p-8 lg:py-20 lg:px-12 bg-no-repeat bg-cover rounded-xl bg-center w-full`}
      style={{backgroundImage: `url(${bg})`}}
    >
      <h2 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-primary xl:w-62 pb-3 sm:pb-4">
        {children}
      </h2>
      <Link
        href="/"
        className="bg-brand py-1.5 sm:py-2 px-2 sm:px-2.5 rounded-lg text-white text-xs sm:text-sm flex items-center gap-1 w-fit"
      >
        Shop Now <FaArrowRight />
      </Link>
    </div>
  );
};

export default PoductBannerItem;