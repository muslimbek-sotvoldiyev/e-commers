"use client";
import CheckoutForm from "@/components/checkout-form";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
});

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Buyurtmani rasmiylashtirish</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CheckoutForm />
        <div className="h-[400px] md:h-full">
          <MapComponent />
        </div>
      </div>
    </div>
  );
}
