"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Minus, Plus, Heart, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  useGetProductIdQuery,
  useAddCardItemMutation,
  useGetCartItemQuery,
} from "@/lib/service/api";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useParams();
  const productId = Number(id);
  const { data: product, isLoading, error } = useGetProductIdQuery({ id });
  const {
    data: cartItems,
    isLoading: cartLoading,
    refetch,
  } = useGetCartItemQuery({});
  const [addToCart] = useAddCardItemMutation();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-200 animate-pulse" />
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="flex items-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-5 w-5 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
              <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="space-y-4">
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div className="py-12 text-center">Xatolik yuz berdi!</div>;
  if (!product)
    return <div className="py-12 text-center">Mahsulot topilmadi!</div>;

  let sizes: string[] = [];
  let colors: string[] = [];

  try {
    if (product.sizes) {
      const parsedSizes = JSON.parse(product.sizes);
      if (Array.isArray(parsedSizes) && parsedSizes.length > 0) {
        sizes = parsedSizes;
      }
    }
  } catch (e) {
    console.error("Error parsing sizes:", e);
  }

  try {
    if (product.colors) {
      const parsedColors = JSON.parse(product.colors);
      if (Array.isArray(parsedColors) && parsedColors.length > 0) {
        colors = parsedColors;
      }
    }
  } catch (e) {
    console.error("Error parsing colors:", e);
  }

  const images =
    product.images.length > 0 ? product.images : ["/defalultproduct.png"];

  const canAddToCart =
    (!sizes.length || selectedSize) && (!colors.length || selectedColor);

  const isProductInCart = cartItems?.some(
    (item) => item.productId === productId
  );

  const handleAddToCart = async () => {
    if (!canAddToCart) {
      return;
    }

    try {
      const cartData = {
        productId,
        quantity,
        color: selectedColor || undefined,
        size: selectedSize || undefined,
      };

      await addToCart(cartData);
      refetch();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white text-black">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="aspect-square relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
            <Image
              src={`http://localhost:4000${images[selectedImage]}`}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-all duration-300 hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {images.map((image: string, index: number) => (
              <button
                key={index}
                className={`aspect-square relative rounded-lg overflow-hidden border ${
                  selectedImage === index
                    ? "ring-2 ring-gray-500 ring-offset-2"
                    : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={`http://localhost:4000${image}`}
                  alt={`${product.name} ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < product.rate
                      ? "text-yellow-300 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500">
                ({product.rate.toFixed(1)})
              </span>
            </div>
            <div className="text-3xl font-bold">
              {product.price.toLocaleString()} so'm
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold">Miqdor:</h3>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="p-2 hover:bg-gray-100 transition-colors"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button
                  className="p-2 hover:bg-gray-100 transition-colors"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {(!selectedSize && sizes.length > 0) ||
            (!selectedColor && colors.length > 0) ? (
              <div className="text-red-500 text-sm">
                {!selectedSize && sizes.length > 0 && "O'lchamni tanlang. "}
                {!selectedColor && colors.length > 0 && "Rangni tanlang."}
              </div>
            ) : null}

            <div className="flex space-x-4">
              {isProductInCart ? (
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => router.push("/cart")}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Savatga o'tish
                </Button>
              ) : (
                <Button
                  className={`flex-1 ${
                    canAddToCart
                      ? "bg-black hover:bg-gray-800"
                      : "bg-gray-300 cursor-not-allowed"
                  } text-white`}
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Savatchaga qo'shish
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
