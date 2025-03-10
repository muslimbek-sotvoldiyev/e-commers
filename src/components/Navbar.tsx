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
import {
  useGetWishlistQuery,
  useGetCartItemQuery,
  useGetMeQuery,
} from "@/lib/service/api";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Products", path: "/products", icon: ShoppingBag },
  { name: "About", path: "/about", icon: Info },
  { name: "Contact", path: "/contact", icon: Phone },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useGetMeQuery({});

  const { data: wishlist, isLoading: wishlistLoading } = useGetWishlistQuery(
    {},
    {
      skip: !userData || !!userError,
    }
  );

  const { data: cartItems, isLoading: cartLoading } = useGetCartItemQuery(
    {},
    {
      skip: !userData || !!userError,
    }
  );

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById("mobile-menu");
      const menuButton = document.getElementById("menu-button");
      const searchContainer = document.getElementById("search-container");
      const target = event.target as HTMLElement;

      if (
        isMenuOpen &&
        menu &&
        !menu.contains(target) &&
        menuButton &&
        !menuButton.contains(target)
      ) {
        setIsMenuOpen(false);
      }

      if (
        isSearchOpen &&
        searchContainer &&
        !searchContainer.contains(target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isSearchOpen]);

  const cartItemsCount = cartItems?.length || 0;
  const wishlistCount = wishlist?.length || 0;

  const shouldShowAuthButtons = !userData || userError;

  return (
    <>
      <div className="h-16" />
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto px-4">
          <Button
            id="menu-button"
            variant="ghost"
            size="icon"
            className="mr-4 lg:hidden"
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
            <span className="text-xl font-bold">UzShop</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center space-x-2 text-sm font-medium"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            {categories.map((category) => (
              <Link
                key={category.path}
                href={category.path}
                className="hover:text-primary transition-colors flex items-center space-x-2 text-sm font-medium"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4 ml-auto">
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex items-center space-x-2"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-64 focus:w-80 transition-all duration-300"
                />
              </div>
              <Button type="submit" variant="default">
                Qidirish
              </Button>
            </form>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <div className="hidden lg:flex items-center space-x-2">
              {shouldShowAuthButtons ? (
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
              ) : (
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
                      {wishlistLoading ? null : wishlistCount > 0 ? (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 min-w-4 flex items-center justify-center px-1">
                          {wishlistCount > 9 ? "9+" : wishlistCount}
                        </span>
                      ) : null}
                    </Button>
                  </Link>
                  <Link href="/cart">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative hover:bg-primary/10"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {cartLoading ? null : cartItemsCount > 0 ? (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 min-w-4 flex items-center justify-center px-1">
                          {cartItemsCount > 9 ? "9+" : cartItemsCount}
                        </span>
                      ) : null}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div
            id="search-container"
            className="lg:hidden border-t bg-background/95 backdrop-blur absolute w-full left-0 top-16 z-50 shadow-lg"
          >
            <form
              onSubmit={handleSearch}
              className="p-3 flex items-center space-x-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(false)}
              >
                Bekor qilish
              </Button>
              <Button type="submit" variant="default" size="sm">
                Qidirish
              </Button>
            </form>
          </div>
        )}
      </header>

      <div
        id="mobile-menu"
        className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-background border-r transform transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-4 space-y-4">
          {categories.map((category) => (
            <Link
              key={category.path}
              href={category.path}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <category.icon className="h-5 w-5" />
              <span className="font-medium">{category.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
          <div className="grid grid-cols-4 h-16">
            {!shouldShowAuthButtons ? (
              <>
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full h-full rounded-none flex flex-col items-center justify-center"
                  >
                    <Home className="h-5 w-5" />
                    <span className="text-xs mt-1">Home</span>
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className="w-full h-full rounded-none flex flex-col items-center justify-center"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-xs mt-1">Profile</span>
                  </Button>
                </Link>
                <Link href="/wishlist">
                  <Button
                    variant="ghost"
                    className="w-full h-full rounded-none flex flex-col items-center justify-center"
                  >
                    <div className="relative inline-block">
                      <Heart className="h-5 w-5" />
                      {!wishlistLoading && wishlistCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {wishlistCount > 9 ? "9+" : wishlistCount}
                        </span>
                      )}
                    </div>
                    <span className="text-xs mt-1">Wishlist</span>
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button
                    variant="ghost"
                    className="w-full h-full rounded-none flex flex-col items-center justify-center"
                  >
                    <div className="relative inline-block">
                      <ShoppingCart className="h-5 w-5" />
                      {!cartLoading && cartItemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {cartItemsCount > 9 ? "9+" : cartItemsCount}
                        </span>
                      )}
                    </div>
                    <span className="text-xs mt-1">Cart</span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full h-full rounded-none flex flex-col items-center justify-center"
                  >
                    <Home className="h-5 w-5" />
                    <span className="text-xs mt-1">Home</span>
                  </Button>
                </Link>
                <Link href="/login" className="col-span-2">
                  <Button
                    variant="ghost"
                    className="w-full h-full rounded-none flex items-center justify-center space-x-2"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="default"
                    className="w-full h-full rounded-none flex items-center justify-center"
                  >
                    <UserPlus className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      )}

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
