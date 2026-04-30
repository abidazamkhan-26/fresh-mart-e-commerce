import React from "react";
import ProductListItem from "../utils/ProductListItem";

const TrendyProducts = async () => {
  const response = await fetch("https://dummyjson.com/products?limit=12", {
    method: "GET",
  });
  const data = await response.json();
  return (
    <section className="pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-3">
          <div>
            <h2 className="font-bold text-primary text-lg sm:text-xl md:text-2xl pb-3 sm:pb-4 border-b border-[#ECECEC] relative after:absolute after:w-16 sm:after:w-20 after:h-0.5 after:bg-[#BCE3C9] after:bottom-0 after:left-0">
              Top Selling
            </h2>
            <div className="flex flex-col gap-5 mt-8">
              {data.products.slice(0, 3).map((item) => (
                <ProductListItem key={item.id} data={item} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-bold text-primary text-lg sm:text-xl md:text-2xl pb-3 sm:pb-4 border-b border-[#ECECEC] relative after:absolute after:w-16 sm:after:w-20 after:h-0.5 after:bg-[#BCE3C9] after:bottom-0 after:left-0">
              Trending Products
            </h2>
            <div className="flex flex-col gap-5 mt-8">
              {data.products.slice(3, 6).map((item) => (
                <ProductListItem key={item.id} data={item} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-bold text-primary text-lg sm:text-xl md:text-2xl pb-3 sm:pb-4 border-b border-[#ECECEC] relative after:absolute after:w-16 sm:after:w-20 after:h-0.5 after:bg-[#BCE3C9] after:bottom-0 after:left-0">
              Recently added
            </h2>
            <div className="flex flex-col gap-5 mt-8">
              {data.products.slice(6, 9).map((item) => (
                <ProductListItem key={item.id} data={item} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-bold text-primary text-lg sm:text-xl md:text-2xl pb-3 sm:pb-4 border-b border-[#ECECEC] relative after:absolute after:w-16 sm:after:w-20 after:h-0.5 after:bg-[#BCE3C9] after:bottom-0 after:left-0">
              Top Rated
            </h2>
            <div className="flex flex-col gap-5 mt-8">
              {data.products.slice(9, 12).map((item) => (
                <ProductListItem key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendyProducts;
