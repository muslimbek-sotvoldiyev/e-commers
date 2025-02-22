import {
  Facebook,
  Instagram,
  Truck,
  Twitter,
  ShoppingCart,
  Home,
  ShoppingBag,
  Info,
  Phone,
  ShieldCheck,
  Clock,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const categories = [
    { name: "Products", path: "/products", icon: ShoppingBag },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  const features = [
    {
      title: "Bepul Yetkazib Berish",
      description: "100,000 so'mdan yuqori xaridlar uchun",
      icon: Truck,
    },
    {
      title: "24/7 Qo'llab-quvvatlash",
      description: "Har qanday savolingizga javob beramiz",
      icon: Clock,
    },
    {
      title: "Xavfsiz To'lov",
      description: "100% himoyalangan to'lov tizimlari",
      icon: CreditCard,
    },
    {
      title: "Sifat Kafolati",
      description: "14 kun ichida qaytarish kafolati",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="bg-background">
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-6">
              <Link href="/" className="flex items-center space-x-2">
                <ShoppingCart className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  UzShop
                </span>
              </Link>
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-sm group w-fit"
                >
                  <Home className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">
                    Home
                  </span>
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.path}
                    href={category.path}
                    className="flex items-center space-x-2 text-sm group w-fit"
                  >
                    <category.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Bizning manzil</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Kuvasay kocha, Fergana, Fergana Region, Uzbekistan</p>
                <p>+998 90 123 45 67</p>
                <p>info@muslimbeksotvoldiyev581@gmail.com</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Bizni kuzating</h3>
              <div className="flex space-x-4">
                <Link
                  href="facebook.com"
                  className="p-2 rounded-full bg-gray-100 hover:bg-primary/10 transition-colors group"
                >
                  <Facebook className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="https://instagram.com/muslimbek.css"
                  className="p-2 rounded-full bg-gray-100 hover:bg-primary/10 transition-colors group"
                >
                  <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="x.com"
                  className="p-2 rounded-full bg-gray-100 hover:bg-primary/10 transition-colors group"
                >
                  <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 border-t py-8 text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} UzShop. Barcha huquqlar
              himoyalangan.
            </p>
            <div className="flex space-x-8">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Maxfiylik siyosati
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Foydalanish shartlari
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
