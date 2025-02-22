"use client";
import { useSearchParams } from "next/navigation";
import { useSearchProductsQuery } from "@/lib/service/api";
import Products from "@/components/Products";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { data: products, isLoading, error } = useSearchProductsQuery(query);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Qidiruv natijalari: <span className="text-blue-500">"{query}"</span>
      </h1>

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-40 bg-gray-200 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center mt-4">
          Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.
        </p>
      )}

      {!isLoading && products?.length ? (
        <Products products={products} isLoading={isLoading} error={error} />
      ) : (
        !isLoading && (
          <div className="flex flex-col items-center mt-10">
            <img
              src="https://lightwidget.com/wp-content/uploads/localhost-file-not-found-480x480.avif"
              alt="Not Found"
              className="w-40 opacity-75"
            />
            <p className="text-gray-500 mt-4">Hech narsa topilmadi.</p>
          </div>
        )
      )}
    </div>
  );
};

export default SearchPage;
