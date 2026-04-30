import Link from "next/link";
import React from "react";

const CategoryItems = ({ data }) => {
  // Use internal route instead of external URL
  // data.slug contains the category slug (e.g., "furniture", "groceries")
  const categoryUrl = data?.slug ? `/shop?category=${data.slug}` : "/shop";

  // Icon mapping for different categories using emojis
  const getCategoryIcon = (categoryName) => {
    const name = categoryName?.toLowerCase() || "";

    if (name.includes("grocery") || name.includes("food")) {
      return " 🛍️";
    } else if (name.includes("furniture") || name.includes("home")) {
      return " 🏠";
    } else if (name.includes("kitchen")) {
      return " 🍴";
    } else if (name.includes("laptop") || name.includes("computer")) {
      return " 🖥️";
    } else if (name.includes("shirt") || name.includes("clothing")) {
      return " 👕";
    } else if (name.includes("shoe") || name.includes("footwear")) {
      return " 👠";
    } else if (name.includes("watch")) {
      return " ⌚️";
    } else if (name.includes("mobile") || name.includes("phone")) {
      return " 📱";
    } else if (name.includes("motorcycle") || name.includes("vehicle")) {
      return " 🚲";
    } else if (name.includes("skin") || name.includes("beauty")) {
      return " 🌸";
    } else if (name.includes("book")) {
      return " 📖";
    } else if (name.includes("sport")) {
      return " ⚽️";
    } else if (name.includes("toy")) {
      return " 🎸";
    } else if (name.includes("electronics")) {
      return " 📈";
    } else {
      return " 🗂️"; // Default icon
    }
  };

  return (
    <div>
      <Link
        href={categoryUrl}
        className="p-3 md:p-4 text-center transition-all hover:shadow-xl min-h-[140px] md:min-h-[160px] flex flex-col justify-center"
      >
        <div className="text-4xl md:text-5xl mb-2">
          {getCategoryIcon(data?.name)}
        </div>
        <h3 className="pt-2 md:pt-4 font-bold text-xs md:text-base text-primary">
          {data?.name || "Category"}
        </h3>
        <p className="text-secondary font-normal text-xs md:text-sm">
          26 items
        </p>
      </Link>
    </div>
  );
};

export default CategoryItems;
