import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Categories() {
  return (
    <div>
      <section className="py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
              Kategoriyalar
            </h2>
            <Link
              href="/categories"
              className="group flex items-center text-sm font-medium text-primary hover:text-primary/80"
            >
              Barchasi
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {["Erkaklar", "Ayollar", "Bolalar", "Aksessuarlar", "Sport"].map(
              (category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square">
                    <img
                      alt={category}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      src="/aaa.jpg"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {category}
                      </h3>
                      <span className="text-sm text-white/80">Ko'rish →</span>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
