"use client";

import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  Home,
  ShoppingBag,
  Info,
  Phone,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

const categories = [
  { name: "Home", path: "/", icon: Home },
  { name: "Shop", path: "/shop", icon: ShoppingBag },
  { name: "About", path: "/about", icon: Info },
  { name: "Contact", path: "/contact", icon: Phone },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <>
      <div className={`h-16 ${isMobile ? "hidden" : "block"}`} />
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
              UzShop
            </span>
          </Link>
          <nav
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row absolute md:relative left-0 right-0 top-16 md:top-0 bg-background md:bg-transparent items-start md:items-center space-y-4 md:space-y-0 space-x-0 md:space-x-8 text-sm font-medium p-4 md:p-0 transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 md:opacity-100 md:translate-y-0"
            }`}
          >
            {categories.map((category) => (
              <Link
                key={category.path}
                href={category.path}
                className="hover:text-primary transition-colors w-full md:w-auto flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {isMobile && <category.icon className="h-5 w-5" />}
                <span>{category.name}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4 ml-auto">
            <form className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Qidirish..."
                  className="w-64 pl-10 pr-4"
                />
              </div>
            </form>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Link href="/profile">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/wishlist">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10 relative"
                    >
                      <Heart className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        2
                      </span>
                    </Button>
                  </Link>
                  <Link href="/cart">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative hover:bg-primary/10"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        3
                      </span>
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-primary/10"
                    >
                      <LogIn className="h-5 w-5 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="default" size="sm">
                      <UserPlus className="h-5 w-5 mr-2" />
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div className="md:hidden border-t p-2 bg-background">
            <form className="flex items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Qidirish..."
                  className="w-full pl-10 pr-4"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </form>
          </div>
        )}
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
          <div className="flex justify-around items-center h-16">
            {isLoggedIn ? (
              <>
                <Link href="/profile" className="flex-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex flex-col items-center w-full"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-xs mt-1">Profile</span>
                  </Button>
                </Link>
                <Link href="/wishlist" className="flex-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex flex-col items-center w-full relative"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="text-xs mt-1">Wishlist</span>
                    <span className="absolute top-0 right-4 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      2
                    </span>
                  </Button>
                </Link>
                <Link href="/cart" className="flex-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex flex-col items-center w-full relative"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="text-xs mt-1">Cart</span>
                    <span className="absolute top-0 right-4 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="flex-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex flex-col items-center w-full"
                  >
                    <LogIn className="h-5 w-5" />
                    <span className="text-xs mt-1">Login</span>
                  </Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex flex-col items-center w-full"
                  >
                    <UserPlus className="h-5 w-5" />
                    <span className="text-xs mt-1">Register</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
