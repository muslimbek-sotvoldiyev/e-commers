"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";
import CheckoutForm from "@/components/checkout-form";
import useAuth from "@/hooks/auth";

const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
});

export default function CheckoutPage() {
  useAuth();
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    long: number;
  } | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Buyurtmani rasmiylashtirish</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CheckoutForm selectedLocation={selectedLocation} />
        <div className="h-[400px] md:h-full">
          <MapComponent onLocationSelect={setSelectedLocation} />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
