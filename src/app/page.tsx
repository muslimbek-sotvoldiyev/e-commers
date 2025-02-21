"use client";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Gallery from "@/components/Gellery";
import { useGetProductsQuery } from "@/lib/service/api";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data: products = [], isLoading, error } = useGetProductsQuery({});
  const limitedProducts = products.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Categories />
      <Products
        products={limitedProducts}
        isLoading={isLoading}
        error={error}
      />
      <div className="flex justify-center">
        <Link href="/products">
          <Button className="bg-primary hover:bg-primary/90 min-w-[9rem] h-12 w-56 flex items-center justify-center">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Productlarni ko'rish
          </Button>
        </Link>
      </div>
      <Gallery />
    </div>
  );
}
