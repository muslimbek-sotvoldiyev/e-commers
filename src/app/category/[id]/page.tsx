"use client";
import Products from "@/components/Products";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategoriesIdQuery } from "@/lib/service/api";
import { useParams } from "next/navigation";
import React from "react";

interface Product {
  id: string;
  name: string;
  sizes: string;
  colors: string;
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useGetCategoriesIdQuery({ id });

  const products = React.useMemo(() => {
    return Array.isArray(data?.products)
      ? data.products.map((product: Product) => ({
          ...product,
          sizes: product.sizes ? JSON.parse(product.sizes) : [],
          colors: product.colors ? JSON.parse(product.colors) : [],
        }))
      : [];
  }, [data?.products]);

  console.log(products);

  return (
    <div>
      <Products products={products} isLoading={isLoading} error={error} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))
          : data?.categories?.map((category: Category) => (
              <Card
                key={category.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {category.name}
                  </h2>
                  <Badge variant="secondary">
                    {category.products.length} mahsulot
                  </Badge>
                </CardContent>
              </Card>
            ))}
      </div>
      {data?.categories?.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          Hech qanday kategoriya topilmadi.
        </p>
      )}
    </div>
  );
}
