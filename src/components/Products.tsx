"use client";
import { ArrowRight, Heart, Share2, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import api, {
  useGetWishlistQuery,
  useToggleWishlistMutation,
} from "@/lib/service/api";
import { useDispatch } from "react-redux";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  rate?: number;
}

interface ProductsProps {
  products: Product[];
  isLoading: boolean;
  error: any;
}

export default function Products({
  products,
  isLoading,
  error,
}: ProductsProps) {
  const {
    data: wishlist,
    isLoading: wishlistLoading,
    refetch,
  } = useGetWishlistQuery({});
  const [toggleWishlist] = useToggleWishlistMutation();
  const dispatch = useDispatch();

  if (isLoading || wishlistLoading) {
    return <p>Yuklanmoqda...</p>;
  }

  if (error) {
    return <p>Xatolik yuz berdi!</p>;
  }

  const handleShare = async (product: Product) => {
    const url = `${window.location.origin}/product/${product.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: "Mana bu mahsulot sizga yoqishi mumkin!",
          url: url,
        });
      } catch (error) {
        console.error("Ulashishda xatolik:", error);
      }
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => alert("Mahsulot havolasi nusxalandi!"))
        .catch((err) => console.error("Nusxalashda xatolik:", err));
    }
  };

  const handleWishlistToggle = async (productId: number) => {
    try {
      await toggleWishlist(productId);
      refetch();
    } catch (error) {
      console.error("Wishlist-ga qo'shishda xatolik:", error);
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist?.some((item: Product) => item.id === productId);
  };

  return (
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
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group"
            >
              <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700 mb-4 group">
                  <img
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    src={
                      product.images.length > 0
                        ? `http://localhost:4000${product.images[0]}`
                        : "/defaultproduct.png"
                    }
                  />

                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-4 right-4 transition-opacity duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      handleWishlistToggle(product.id);
                    }}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isInWishlist(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </Button>

                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-12 right-4 transition-opacity duration-300 mt-3"
                    onClick={(e) => {
                      e.preventDefault();
                      handleShare(product);
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-lg truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      {product.price.toLocaleString("uz-UZ")} so'm
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < (product.rate || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    size="sm"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Productni ko'rish
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
