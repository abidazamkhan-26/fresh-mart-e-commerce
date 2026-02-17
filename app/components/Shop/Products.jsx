export const dynamic = "force-dynamic";
import Link from "next/link";
import ProductItems from "../Product/ProductITems";
import Limits from "./Limits";

export default async function Products({ searchParams }) {
  const limit = parseInt(searchParams?.limit ?? "25", 10) || 25;
  const skip = parseInt(searchParams?.skip ?? "0", 10) || 0;
  const category = searchParams?.category;

  // Build API URL - use category endpoint if category is provided
  let apiUrl = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
  if (category && typeof category === 'string') {
    // Use category-specific endpoint
    apiUrl = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
  }

  const res = await fetch(
    apiUrl,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const data = await res.json();

  const total = data?.total ?? 0;
  const products = data?.products ?? [];

  const prevSkip = Math.max(0, skip - limit);
  const nextSkip = skip < total - limit ? skip + limit : skip;

  const count = (limit, skip) => {
    const params = new URLSearchParams({ limit: limit.toString(), skip: skip.toString() });
    if (category) {
      params.set('category', category);
    }
    return `?${params.toString()}`;
  };

  return (
    <section className="pb-8 sm:pb-12 px-4 sm:px-6">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div>
            <p className="text-sm sm:text-base">
              We found <span className="font-bold text-brand">{total}</span> items for you!
            </p>
            {category && (
              <p className="text-xs sm:text-sm text-secondary mt-1">
                Category: <span className="font-semibold text-primary capitalize">{category.replace(/-/g, ' ')}</span>
              </p>
            )}
          </div>
          <Limits limit={limit} skip={skip} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 md:pt-5 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {products.length > 0 &&
            products.map((item) => <ProductItems key={item.id} data={item} />)}
        </div>
        <div className="flex justify-center items-center gap-6 sm:gap-10 my-6 sm:my-8 md:my-10">
          <Link
            href={count(limit, prevSkip)}
            scroll={false}
            className="text-white bg-brand hover:bg-brand/60 hover:text-black duration-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-medium text-sm sm:text-base"
          >
            Prev
          </Link>
          <Link
            href={count(limit, nextSkip)}
            scroll={false}
            className="text-white bg-brand hover:bg-brand/60 hover:text-black duration-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-medium text-sm sm:text-base"
          >
            Next
          </Link>
        </div>
      </div>
    </section>
  );
}