"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ProductListItem = ({ data }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="flex">
      {imageError || !data?.thumbnail ? (
        <div className="max-w-28 w-28 h-28 bg-gray-200 flex items-center justify-center rounded-lg">
          <span className="text-gray-500 text-xs">No Image</span>
        </div>
      ) : (
        <img
          src={data?.thumbnail}
          alt="product"
          className="max-w-28"
          onError={handleImageError}
          loading="lazy"
        />
      )}
      <div>
        <h3 className="text-primary font-bold text-sm md:text-base">
          {data?.title}
        </h3>
        <div className="flex gap-3 py-2.5">
          <ul className="flex text-amber-400">
            <li>
              <FaStar />
            </li>
            <li>
              <FaStar />
            </li>
            <li>
              <FaStar />
            </li>
            <li>
              <FaStar />
            </li>
            <li>
              <FaStar />
            </li>
          </ul>
          <p className="text-xs font-normal text-secondary">(4.0)</p>
        </div>
        <h4 className="text-sm md:text-lg font-bold text-brand">
          ${data?.price}
          <span className="text-secondary text-base line-through">$32</span>
        </h4>
      </div>
    </div>
  );
};

export default ProductListItem;
