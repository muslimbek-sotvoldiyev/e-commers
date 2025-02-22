"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGetCategoriesQuery } from "@/lib/service/api";

export default function Categories() {
  const { data: categories, isLoading, error } = useGetCategoriesQuery({});

  if (isLoading) {
    return <p className="text-center">Yuklanmoqda...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Xatolik yuz berdi!</p>;
  }

  if (!categories || categories.length === 0) {
    return (
      <section className="py-16">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            Kategoriyalar
          </h2>
          <p className="text-gray-500 mt-4">
            Hozircha kategoriyalar mavjud emas.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
              Kategoriyalar
            </h2>
            <Link
              href="/category"
              className="group flex items-center text-sm font-medium text-primary hover:text-primary/80"
            >
              Barchasi
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            modules={[Navigation, Pagination]}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="pb-6"
          >
            {categories.map((category: { id: number; name: string }) => (
              <SwiperSlide key={category.id}>
                <Link
                  href={`/category/${category.id}`}
                  className="group flex items-center justify-center p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 text-center text-lg font-semibold"
                >
                  {category.name}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
