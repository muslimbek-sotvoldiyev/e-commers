import { ArrowRight, Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const products = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: `Mahsulot nomi ${i + 1}`,
  currentPrice: "299,000",
  oldPrice: "399,000",
  discount: "25",
  rating: 5,
  reviews: 24,
  image: "/aaa.jpg",
}));

export default function Products() {
  return (
    <div>
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
              Ommabop Mahsulotlar
            </h2>
            <Link
              href="/products"
              className="group flex items-center text-sm font-medium text-primary hover:text-primary/80"
            >
              Barchasi
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700 mb-4">
                  <img
                    alt="Product img"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    src={product.image}
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Badge className="absolute top-4 left-4 bg-primary text-white">
                    -{product.discount}%
                  </Badge>
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium text-lg truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      {product.currentPrice} so'm
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {product.oldPrice} so'm
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: product.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    size="sm"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Savatga qo'shish
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
