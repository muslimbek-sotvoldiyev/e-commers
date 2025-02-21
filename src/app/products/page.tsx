"use client";
import Products from "@/components/Products";
import { useGetProductsQuery } from "@/lib/service/api";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { data: products = [], isLoading, error } = useGetProductsQuery({});
  const [page, setPage] = useState(1);
  const limit = 10;
  const displayedProducts = products.slice(0, page * limit);
  const canLoadMore = displayedProducts.length < products.length;

  return (
    <div>
      <Products
        products={displayedProducts}
        isLoading={isLoading}
        error={error}
      />

      {!isLoading && canLoadMore && (
        <div className="flex justify-center">
          <Button
            className="bg-primary hover:bg-primary/90 mb-7"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Ko'proq yuklash
          </Button>
        </div>
      )}
    </div>
  );
}
