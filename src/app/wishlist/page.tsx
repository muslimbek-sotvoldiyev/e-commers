"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2, X } from "lucide-react";
import { useState } from "react";

// Demo data - real implementation would fetch from API/database
const initialWishlist = [
  {
    id: 1,
    name: "Zamonaviy Charm Divan",
    price: 1299000,
    image: "/placeholder.svg",
    category: "Mehmonxona",
  },
  {
    id: 2,
    name: "Yog'och Oshxona Stoli",
    price: 899000,
    image: "/placeholder.svg",
    category: "Oshxona",
  },
  {
    id: 3,
    name: "Minimalistik Yotoq Ramkasi",
    price: 2199000,
    image: "/placeholder.svg",
    category: "Yotoqxona",
  },
  {
    id: 4,
    name: "Ofis Stul",
    price: 599000,
    image: "/placeholder.svg",
    category: "Ofis",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const addAllToCart = () => {
    // Implement add all to cart functionality here
    console.log("Adding all items to cart");
  };

  const totalPrice = wishlist.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Sevimlilar</h1>

        {wishlist.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:flex-grow">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mahsulot
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kategoriya
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Narx
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amallar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {wishlist.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-16 w-16 relative">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="rounded-md object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {item.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {item.price.toLocaleString()} so'm
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm">
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Savatga
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromWishlist(item.id)}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="lg:w-80">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Sevimlilar jami</h2>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Jami narx:</span>
                  <span className="text-xl font-bold">
                    {totalPrice.toLocaleString()} so'm
                  </span>
                </div>
                <div className="space-y-3">
                  <Button className="w-full" onClick={addAllToCart}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Hammasini savatga qo'shish
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearWishlist}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Ro'yxatni tozalash
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">
              Sevimlilar ro'yxati bo'sh
            </h2>
            <p className="text-gray-600 mb-6">
              Siz hali hech qanday mahsulotni sevimlilarga qo'shmagansiz
            </p>
            <Link href="/products">
              <Button>Mahsulotlarni ko'rish</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
