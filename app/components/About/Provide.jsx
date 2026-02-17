import React from "react";
import ProvideItem from "./ProvideItem";

const Provide = () => {
  return (
    <section className="pt-6 sm:pt-8 md:pt-10 pb-5 px-4 sm:px-6">
      <div className="container">
        <div className="xl:px-35">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">What we Provide?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mx-0 sm:mx-5 mt-4 sm:mt-5">
            <ProvideItem />
            <ProvideItem />
            <ProvideItem />
            <ProvideItem />
            <ProvideItem />
            <ProvideItem />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Provide;
