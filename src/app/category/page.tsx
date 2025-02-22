"use client";
import { useGetCategoriesQuery } from "@/lib/service/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function CategoriesPage() {
  const { data: categories, isLoading, error } = useGetCategoriesQuery({});

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-500">Xatolik yuz berdi</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Kategoriyalar</h1>
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
          : categories?.map((category: any) => (
              <Card
                key={category.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/category/${category.id}`}>
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {category.name}
                    </h2>
                    <Badge variant="secondary">
                      {category.itemCount} mahsulot
                    </Badge>
                  </CardContent>
                </Link>
              </Card>
            ))}
      </div>
      {categories?.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          Hech qanday kategoriya topilmadi.
        </p>
      )}
    </div>
  );
}
