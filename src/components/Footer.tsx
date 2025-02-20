import { Facebook, Instagram, Truck, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div>
      <section className="py-12 bg-black">
        <div className="container px-4 md:px-6 text-white mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Bepul Yetkazib Berish",
                description: "100,000 so'mdan yuqori xaridlar uchun",
              },
              {
                title: "24/7 Qo'llab-quvvatlash",
                description: "Har qanday savolingizga javob beramiz",
              },
              {
                title: "Xavfsiz To'lov",
                description: "100% himoyalangan to'lov tizimlari",
              },
              {
                title: "Sifat Kafolati",
                description: "14 kun ichida qaytarish kafolati",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center space-y-2"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <Truck />
                </div>
                <h3 className="font-medium">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="border-t bg-black text-white dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Kompaniya</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:underline">
                    Biz haqimizda
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:underline">
                    Karyera
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="hover:underline">
                    Matbuot
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Yordam</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="hover:underline">
                    Bog'lanish
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:underline">
                    Ko'p so'raladigan savollar
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:underline">
                    Yetkazib berish
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:underline">
                    Qaytarish va almashtirish
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Xizmatlar</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/gift-cards" className="hover:underline">
                    Sovg'a kartalari
                  </Link>
                </li>
                <li>
                  <Link href="/loyalty" className="hover:underline">
                    Sodiqlik dasturi
                  </Link>
                </li>
                <li>
                  <Link href="/personal-shopper" className="hover:underline">
                    Shaxsiy xaridor
                  </Link>
                </li>
                <li>
                  <Link href="/tailoring" className="hover:underline">
                    Tikuvchilik xizmati
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Bizni kuzating</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-500 hover:text-primary">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-primary">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-primary">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between space-y-4 border-t py-8 sm:flex-row sm:space-y-0">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} UzShop. Barcha huquqlar
              himoyalangan.
            </p>
            <div className="flex space-x-4 text-sm text-gray-500">
              <Link href="/privacy" className="hover:underline">
                Maxfiylik siyosati
              </Link>
              <Link href="/terms" className="hover:underline">
                Foydalanish shartlari
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
