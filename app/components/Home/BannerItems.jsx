import React from "react";
import { IoIosSend } from "react-icons/io";
const BannerItems = () => {
  return (
    <div>
      <div
        className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-no-repeat bg-cover rounded-2xl sm:rounded-3xl lg:rounded-4xl bg-center md:bg-right"
        style={{ backgroundImage: "url('/banner.png')" }}
      >
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-7xl text-primary max-w-full sm:max-w-2xl">
          Fresh Vegetables Big discount
        </h1>
        <p className="pt-4 sm:pt-5 md:pt-10 pb-4 sm:pb-5 md:pb-10 lg:pb-16 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-normal text-secondary">
          Save up to 50% off on your first order
        </p>
        <div className="bg-white rounded-full max-w-full sm:max-w-md flex flex-col sm:flex-row items-stretch sm:items-center gap-1 sm:gap-0 pl-2 pr-2 sm:pr-0">
          <IoIosSend className="text-2xl sm:text-3xl md:text-4xl text-secondary hidden sm:block" />
          <input
            type="email"
            placeholder="Your email address"
            className="w-full outline-0 text-sm sm:text-base py-2 sm:py-0"
          />
          <button className="py-2 sm:py-2 md:py-3 lg:py-6 px-4 sm:px-3 md:px-6 lg:px-10 bg-brand rounded-full sm:rounded-4xl text-white text-xs sm:text-sm md:text-base cursor-pointer whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerItems;
