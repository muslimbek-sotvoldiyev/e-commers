"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Minus, Plus, Heart, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useGetProductIdQuery } from "@/lib/service/api";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);
  const { data: product, isLoading, error } = useGetProductIdQuery({ id });

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

  if (isLoading) return <div className="py-12 text-center">Yuklanmoqda...</div>;
  if (error) return <div className="py-12 text-center">Xatolik yuz berdi!</div>;
  if (!product)
    return <div className="py-12 text-center">Mahsulot topilmadi!</div>;

  // Parse and validate sizes and colors
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
    product.images.length > 0 ? product.images : ["/placeholder.svg"];

  // Check if we can add to cart
  const canAddToCart =
    (!sizes.length || selectedSize) && (!colors.length || selectedColor);

  const handleAddToCart = () => {
    if (!canAddToCart) {
      return;
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
                      ? "text-gray-900 fill-current"
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
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Kategoriya:</span>
              <span className="font-medium">{product.category}</span>
            </div>

            {sizes.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold mb-2">O'lchamlar:</h3>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant="outline"
                      className={`border-gray-300 ${
                        selectedSize === size
                          ? "bg-black text-white hover:bg-black"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {colors.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold mb-2">Ranglar:</h3>
                <div className="flex gap-2 flex-wrap">
                  {colors.map((color) => (
                    <Button
                      key={color}
                      variant="outline"
                      className={`border-gray-300 ${
                        selectedColor === color
                          ? "bg-black text-white hover:bg-black"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold mb-2">Tavsif:</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
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
              <Button
                variant="outline"
                size="icon"
                onClick={toggleWishlist}
                className={`border-gray-300 ${
                  isWishlisted ? "bg-gray-100" : "hover:bg-gray-100"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? "fill-current text-black" : "text-gray-500"
                  }`}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
