"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useGetWishlistQuery,
  useDeleteWishlistMutation,
  useClearWishlistMutation,
} from "@/lib/service/api";
import useAuth from "@/hooks/auth";

export default function WishlistPage() {
  useAuth();
  const router = useRouter();
  const { data, error, isLoading, refetch } = useGetWishlistQuery({});
  const [deleteWishlist] = useDeleteWishlistMutation();
  const [clearWishlistMutation] = useClearWishlistMutation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error && "status" in error && error.status === 404) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
        <div className="container px-4 mx-auto max-w-[1400px]">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
            Sevimlilar
          </h1>
          <div className="text-center py-12 sm:py-16 bg-white rounded-lg shadow mx-4">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 mb-4">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-medium mb-2">
              Sevimlilar ro'yxati bo'sh
            </h2>
            <p className="text-gray-600 mb-6 px-4">
              Siz hali hech qanday mahsulotni sevimlilarga qo'shmagansiz
            </p>
            <Link href="/products">
              <Button>Mahsulotlarni ko'rish</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-medium text-red-600 mb-2">
            Xatolik yuz berdi
          </h2>
          <p className="text-gray-600">
            Ma'lumotlarni yuklashda xatolik yuz berdi. Iltimos, qaytadan urinib
            ko'ring.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Qayta yuklash
          </button>
        </div>
      </div>
    );
  }

  const wishlist = Array.isArray(data)
    ? data.map((item) => ({
        ...item,
        images:
          item.images && item.images.length > 0
            ? item.images
            : ["/defaultproduct.png"],
      }))
    : [];

  const removeFromWishlist = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteWishlist(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Wishlistdan o'chirishda xatolik:", error);
    }
  };

  const clearWishlist = async () => {
    try {
      await clearWishlistMutation({}).unwrap();
      refetch();
    } catch (error) {
      console.error("Wishlistni tozalashda xatolik:", error);
    }
  };

  const handleRowClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  const totalPrice = wishlist.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="container px-4 mx-auto max-w-[1400px]">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
          Sevimlilar
        </h1>

        {wishlist.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            <div className="lg:flex-grow">
              <div className="bg-white rounded-lg shadow">
                <div className="block sm:hidden">
                  {wishlist.map((item) => (
                    <div key={item.id} className="p-4 border-b last:border-b-0">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/products/${item.id}`}
                          className="flex-shrink-0"
                        >
                          <div className="relative h-20 w-20">
                            <Image
                              src={
                                `http://localhost:4000${item.images[0]}` ||
                                "/defaultproduct.png"
                              }
                              alt={item.name}
                              fill
                              className="rounded-md object-cover"
                            />
                          </div>
                        </Link>
                        <div className="flex-grow min-w-0">
                          <Link href={`/products/${item.id}`}>
                            <h3 className="text-sm font-medium text-gray-900 truncate hover:text-blue-600">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            {typeof item.category === "string"
                              ? item.category
                              : item.category.name}
                          </p>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {item.price.toLocaleString()} so'm
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => removeFromWishlist(item.id, e)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mahsulot
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kategoriya
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Narx
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amallar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {wishlist.map((item) => (
                        <tr
                          key={item.id}
                          onClick={() => handleRowClick(item.id)}
                          className="hover:bg-gray-50 cursor-pointer"
                        >
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-12 w-12 sm:h-16 sm:w-16 relative">
                                <img
                                  src={
                                    `http://localhost:4000${item.images[0]}` ||
                                    "/defaultproduct.png"
                                  }
                                  alt={item.name}
                                  className="rounded-md object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 hover:text-blue-600">
                                  {item.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {typeof item.category === "string"
                                ? item.category
                                : item.category.name}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.price.toLocaleString()} so'm
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => removeFromWishlist(item.id, e)}
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

            <div className="w-full lg:w-80 order-first lg:order-last">
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h2 className="text-lg font-semibold mb-4">Sevimlilar jami</h2>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Jami narx:</span>
                  <span className="text-lg sm:text-xl font-bold">
                    {totalPrice.toLocaleString()} so'm
                  </span>
                </div>
                <div className="space-y-3">
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
          <div className="text-center py-12 sm:py-16 bg-white rounded-lg shadow mx-4">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 mb-4">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-medium mb-2">
              Sevimlilar ro'yxati bo'sh
            </h2>
            <p className="text-gray-600 mb-6 px-4">
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
