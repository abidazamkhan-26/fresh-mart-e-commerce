import { Box, Rating } from "@mui/material";
import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const ShoppingCart = ({data}) => {
  return (
    <div className="space-y-4">
      <div
        key={data.id}
        className="flex flex-col sm:flex-row items-start sm:items-center bg-white px-3 sm:px-4 py-3 sm:py-0 gap-3 sm:gap-0 border-b sm:border-b-0 border-gray-200 sm:border-0"
      >
        <div className="hidden sm:block min-w-5 px-2 sm:px-3 py-2">
          <input type="checkbox" />
        </div>
        <div className="min-w-full sm:min-w-120 px-0 sm:px-3 py-2 flex items-center gap-3 sm:gap-2">
          <input type="checkbox" className="sm:hidden" />
          <img
            src={data?.thumbnail || "/product.png"}
            alt="name"
            className="w-16 h-16 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base md:text-lg truncate">
              {data?.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">⭐ 4.0 rating</p>
            {/* <Box>
              <Rating
                className="text-sm"
                name="simple-controlled"
                // value={data?.rating || 0}
              />
            </Box> */}
          </div>
        </div>
        <div className="w-full sm:w-auto flex sm:block items-center justify-between sm:justify-center sm:min-w-30 px-0 sm:px-3 py-2">
          <span className="sm:hidden text-xs text-gray-600">Price:</span>
          <p className="text-center text-base sm:text-lg font-bold text-gray-700">
            ${data.price.toFixed(2)}
          </p>
        </div>
        <div className="w-full sm:w-auto flex sm:block items-center justify-between sm:justify-center sm:min-w-30 px-0 sm:px-3 py-2">
          <span className="sm:hidden text-xs text-gray-600">Quantity:</span>
          <input
            type="number"
            min="1"
            max="5"
            defaultValue="1"
            value={data?.quantity}
            className="w-16 border rounded text-center text-sm sm:text-base md:text-lg"
          />
        </div>
        <div className="w-full sm:w-auto flex sm:block items-center justify-between sm:justify-center sm:min-w-30 px-0 sm:px-3 py-2">
          <span className="sm:hidden text-xs text-gray-600">Subtotal:</span>
          <p className="text-center text-base sm:text-lg font-semibold">
            ${(data?.price * data?.quantity).toFixed(2)}
          </p>
        </div>
        <button className="w-full sm:w-auto sm:min-w-30 px-0 sm:px-3 py-2 flex justify-center text-base sm:text-lg text-red-500 hover:underline">
          <RiDeleteBin5Line />
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
