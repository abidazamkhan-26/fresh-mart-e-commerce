import Counter from "@/app/components/Shop/Counter";
import ProductDetails from "@/app/components/Shop/ProductDetails";
import RelatedProducts from "@/app/components/Shop/RelatedProducts";
import MapBreadcramp from "@/app/components/utils/MapBreadcramp";
import { Box, Rating } from "@mui/material";
import Image from "next/image";
import React from "react";

async function relateData() {
  const res = await fetch("https://dummyjson.com/products?limit=5", {
    cache: "no-store",
  });
  return await res.json();
}

export default async function page({ params }) {
  const { id } = params;

  async function ProductData() {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 500 },
    });
    return res.json();
  }
  const data = await ProductData();
  const relatedProducts = await relateData();

  return (
    <div className="container px-4 sm:px-6">
      <MapBreadcramp title={data.title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-4 sm:p-6 max-w-6xl mx-auto">
        {/* Left - Product Image */}
        <div className="flex flex-col items-center">
          <Image
            width={150}
            height={150}
            src={data?.thumbnail}
            alt="Organic Spirulina"
            className="rounded-2xl shadow-lg w-full max-w-md md:w-110 h-auto"
          />

          <div className="flex gap-2 sm:gap-3 mt-4 overflow-x-auto pb-2 md:overflow-x-visible md:pb-0">
            {(data?.images ?? []).map((thumb, i) => (
              <Image
                width={100}
                height={100}
                key={i}
                src={thumb}
                alt="thumbnail"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 border rounded-xl cursor-pointer hover:border-green-500 flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="flex flex-col gap-4">
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full w-max text-sm">
            {data?.availabilityStatus}
          </span>

          <div>
            {/* Product Category */}
            <h4 className="text-xs font-normal text-secondary">
              {data?.category}
            </h4>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              {data?.title || "Organic Spirulina"}
            </h1>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-2">
            <Box>
              <Rating
                className="text-sm"
                name="simple-controlled"
                value={data?.rating || 0}
              />
            </Box>
            <span className="text-gray-600 text-sm">
              {(data?.reviews ?? []).length > 0
                ? (data?.reviews ?? []).length
                : "0"}{" "}
              Reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span className="text-2xl sm:text-3xl font-bold text-green-600">
              ${data?.price}
            </span>
            <span className="line-through text-gray-400 text-sm sm:text-base">
              ${(data?.price + data?.discountPercentage).toFixed(2)}
            </span>
            <span className="text-xs sm:text-sm text-red-500">
              {data?.discountPercentage}% Off
            </span>
          </div>

          <p className="text-sm font-normal text-secondary">
            By{" "}
            <span className="text-brand">
              {data?.brand ? data?.brand : "Nest"}{" "}
            </span>
          </p>

          {/* Short Description */}
          <p className="text-gray-600">{data?.description}</p>

          {/* Size / Weight */}
          <div className="flex items-center gap-2">
            <h3 className="font-medium mb-2">Size / Weight:</h3>
            <div className="flex gap-2">
              <button className="px-4 rounded-lg border bg-green-600 text-white border-green-600">
                {data?.weight}
              </button>
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <Counter />

          {/* Meta Info */}
          <div className="p-3 sm:p-4 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3 sm:mb-4">
              <p className="w-full sm:w-60 font-medium">
                Delivery: {data?.shippingInformation}
              </p>
              <p className="w-full sm:w-60 font-medium">SKU: {data?.sku}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3 sm:mb-4">
              <p className="w-full sm:w-60 font-medium">Tags: {data?.tags?.join(", ")}</p>
              <p className="w-full sm:w-60 font-medium">Stock: {data?.stock}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3 sm:mb-4">
              <p className="w-full sm:w-60 font-medium">Return: {data?.returnPolicy}</p>
              <p className="w-full sm:w-60 font-medium">
                Warranty: {data?.warrantyInformation}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4 sm:p-6 border-1 border-gray-400 rounded-lg shadow-md mt-6 sm:mt-8">
        <ProductDetails data={data} />
      </div>
      <div className="my-6 sm:my-8 md:my-10 px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl font-bold text-start mb-4 sm:mb-6">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 md:pt-5 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {relatedProducts.products.map((item) => (
            <RelatedProducts key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

// export default page;
