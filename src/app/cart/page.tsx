"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ArrowLeft, CarTaxiFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import api, {
  useGetCartItemQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} from "@/lib/service/api";

export default function ShoppingCart() {
  const router = useRouter();
  const { data: cartItems, isLoading, refetch } = useGetCartItemQuery({});
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const handleQuantityChange = async (
    itemId: number,
    change: number,
    currentQuantity: number
  ) => {
    const newQuantity = Math.max(1, currentQuantity + change);
    try {
      await updateCartItem({ id: itemId, quantity: newQuantity });
      refetch();
    } catch (error) {
      console.error("Error updating quantity:", error);
      refetch();
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await deleteCartItem({ id: itemId });
      refetch();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const calculateTotal = () => {
    if (!cartItems) return 0;
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-200 rounded-md" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
                <div className="w-24 h-8 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    // refetch();
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center py-12">
          <div className="mb-4 text-gray-500">
            <CarTaxiFront className="mx-auto h-16 w-16" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Savatingiz bo'sh</h2>
          <Button
            onClick={() => router.push("/")}
            className="bg-black text-white hover:bg-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Xarid qilishni davom ettirish
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Orqaga
        </Button>
        <h1 className="text-2xl font-bold">Savat</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-4 shadow-sm border"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={`http://localhost:4000${
                      item.product.images?.[0] || "/defaultproduct.png"
                    }`}
                    alt={item.product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-600">
                    {item.product.price.toLocaleString()} so'm
                  </p>
                  {item.size && (
                    <p className="text-sm text-gray-500">
                      O'lcham: {item.size}
                    </p>
                  )}
                  {item.color && (
                    <p className="text-sm text-gray-500">Rang: {item.color}</p>
                  )}
                </div>
                <div className="flex gap-3 items-center space-y-2">
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <button
                      className="p-2 hover:bg-gray-100"
                      onClick={() =>
                        handleQuantityChange(item.id, -1, item.quantity)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 font-medium">{item.quantity}</span>
                    <button
                      className="p-2 hover:bg-gray-100"
                      onClick={() =>
                        handleQuantityChange(item.id, 1, item.quantity)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.product.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 shadow-sm border sticky top-4">
            <h2 className="text-xl font-semibold mb-4">
              Buyurtma ma'lumotlari
            </h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Mahsulotlar ({cartItems.length})
                </span>
                <span>{calculateTotal().toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Yetkazib berish</span>
                <span>Bepul</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Jami</span>
                  <span>{calculateTotal().toLocaleString()} so'm</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => {
                router.push("/order");
              }}
              className="w-full bg-black hover:bg-gray-800 text-white"
            >
              Rasmiylashtirish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
