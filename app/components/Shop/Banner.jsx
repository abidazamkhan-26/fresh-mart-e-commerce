import React from "react";
import Breadcramp from "../utils/Breadcramp";

const Banner = () => {
  return (
    <section className="pt-6 sm:pt-8 pb-8 sm:pb-10 md:pb-12">
      <div className="container px-4 sm:px-6">
        <div className="bg-[url(/shop-bg.png)] bg-no-repeat bg-center px-5 py-10 md:p-20 rounded-3xl">
          <Breadcramp />
        </div>
      </div>
    </section>
  );
};

export default Banner;
