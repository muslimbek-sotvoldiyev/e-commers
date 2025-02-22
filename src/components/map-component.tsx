"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin } from "lucide-react";

// Leaflet ikonkasini to'g'irlash
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/location.png",
  // iconUrl: "/location.png",
  shadowUrl: "/location.png",
});

type LatLngType = [number, number];

function LocationMarker({
  position,
  setPosition,
}: {
  position: LatLngType | null;
  setPosition: (pos: LatLngType) => void;
}) {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  return position === null ? null : <Marker position={position}></Marker>;
}

function ChangeView({ center }: { center: LatLngType }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export default function MapComponent() {
  const [position, setPosition] = useState<LatLngType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation sizning brauzeringizda qo'llab-quvvatlanmaydi");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        setLoading(false);
      },
      (error) => {
        setError("Joylashuvni aniqlashda xatolik yuz berdi");
        setLoading(false);
        console.error("Geolocation error:", error);
      }
    );
  }, []);

  useEffect(() => {
    // Komponent yuklanganda avtomatik ravishda joylashuvni aniqlash
    getLocation();
  }, [getLocation]);

  return (
    <div className="relative h-[400px] md:h-full">
      <MapContainer
        center={position || [41.299496, 69.240073]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && <ChangeView center={position} />}
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      <div className="absolute top-4 right-4 z-[1000]">
        <Button onClick={getLocation} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Aniqlanmoqda...
            </>
          ) : (
            <>
              <MapPin className="mr-2 h-4 w-4" />
              Mening joylashuvim
            </>
          )}
        </Button>
      </div>
      {error && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000] bg-destructive text-destructive-foreground p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
