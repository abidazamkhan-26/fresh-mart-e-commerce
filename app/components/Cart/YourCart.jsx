import React from "react";
import ShoppingCart from "./ShoppingCart";
import { RiDeleteBin5Line, RiShoppingCartLine } from "react-icons/ri";
import { FaTruck, FaTag, FaGift } from "react-icons/fa";

const YourCart = async () => {
  const res = await fetch("https://dummyjson.com/carts/5", {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <section className="pt-8 sm:pt-12 pb-8 sm:pb-16 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <RiShoppingCartLine className="text-white text-xl" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Shopping Cart
            </h1>
          </div>
          <p className="text-gray-600 ml-15">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <h5 className="text-lg font-semibold text-gray-800">
                    <span className="text-green-500">
                      {data?.totalProducts}
                    </span>{" "}
                    Items
                  </h5>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200">
                  <RiDeleteBin5Line className="text-lg" />
                  <span className="font-medium">Clear Cart</span>
                </button>
              </div>
              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 text-sm font-semibold text-gray-600">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-500 rounded"
                  />
                </div>
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
                <div className="col-span-1 text-center">Remove</div>
              </div>
              {/* Cart Items */}
              <div className="divide-y divide-gray-100">
                {data.products?.map((item) => (
                  <ShoppingCart key={item.id} data={item} />
                ))}
              </div>

              {/* Summary Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Total Products</p>
                    <p className="text-xl font-bold text-green-600">
                      {data?.totalProducts}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Total Quantity</p>
                    <p className="text-xl font-bold text-green-600">
                      {data?.totalQuantity}
                    </p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
          {/* Checkout Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Order Summary</h3>
                <p className="text-green-100 text-sm">Complete your purchase</p>
              </div>

              <div className="p-6 space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FaTag className="text-gray-400" />
                      <span className="text-gray-600">Subtotal</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      ${(data?.total + data?.discountedTotal).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FaGift className="text-gray-400" />
                      <span className="text-gray-600">Discount</span>
                    </div>
                    <span className="font-semibold text-green-600">
                      -${data?.discountedTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FaTruck className="text-gray-400" />
                      <span className="text-gray-600">Shipping</span>
                    </div>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="border-t border-gray-100 pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apply Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                    />
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="border-t border-gray-100 pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Method
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors">
                    <option value="cash-on-delivery">Cash on Delivery</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                {/* Total */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-700">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      ${data?.total.toFixed(2)}
                    </span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YourCart;
