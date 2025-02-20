import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div>
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
            <div className="flex flex-col justify-center space-y-6">
              <Badge className="w-fit text-sm px-4 py-1 bg-primary/10 text-primary border-primary/20">
                Yangi Kolleksiya
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                Yangi Mavsum Mahsulotlari
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-300">
                Eng so'nggi trenddagi kiyimlar va aksessuarlar bilan tanishing.
                Moda dunyosining eng sara mahsulotlari endi UzShop-da.
              </p>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Xarid Qilish
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Kolleksiyani Ko'rish
                </Button>
              </div>
            </div>
            <div className="relative mx-auto aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <img
                alt="Hero img"
                className="object-cover w-full h-full transition-transform hover:scale-105 duration-700"
                src="/aa.jpg"
              />
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <p className="text-sm font-medium">Chegirma -30%</p>
                <p className="text-xs text-gray-600">
                  Barcha yangi mahsulotlarga
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
