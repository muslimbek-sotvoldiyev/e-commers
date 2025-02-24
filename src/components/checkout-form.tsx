"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api, {
  useCreateOrderMutation,
  useGetCardInfoQuery,
  useGetCartItemQuery,
} from "@/lib/service/api";
import OrderSkeleton from "./orderSkeleton";
import { useDispatch } from "react-redux";

export default function CheckoutForm({
  selectedLocation,
}: {
  selectedLocation: { lat: number; long: number } | null;
}) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [newCard, setNewCard] = useState({ number: "", expiry: "", cvc: "" });
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const { data: cartItems = [], isLoading: isCartLoading } =
    useGetCartItemQuery({});
  const { data: cards = [], isLoading: isLoadingCard } = useGetCardInfoQuery(
    {}
  );
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  if (isLoadingCard && isCartLoading) {
    return <OrderSkeleton />;
  }

  const totalAmount = cartItems.reduce(
    (total: any, item: any) => total + item.product.price * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLocation) {
      toast.error("Iltimos, xaritadan joyni tanlang");
      return;
    }

    if (paymentMethod === "card" && !selectedCard) {
      toast.error("Iltimos, to'lov kartasini tanlang");
      return;
    }

    const orderData: any = {
      long: selectedLocation.long,
      lat: selectedLocation.lat,
      description,
    };

    if (selectedCard) {
      orderData.cardInfoId = selectedCard;
    }

    console.log("Buyurtma ma'lumotlari:", orderData);

    try {
      const result = await createOrder(orderData).unwrap();
      if (!result) {
        throw new Error("Serverdan noto‘g‘ri javob keldi");
      }

      toast.success("Buyurtmangiz qabul qilindi");
      dispatch(api.util.resetApiState());
      router.push("/");
    } catch (error: any) {
      let errorMessage =
        "Buyurtma yaratishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";

      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
  };

  const handleAddCard = () => {
    const newCardId = cards.length + 1;
    setCards([
      ...cards,
      { id: newCardId, number: newCard.number, expiry: newCard.expiry },
    ]);
    setSelectedCard(newCardId);
    setNewCard({ number: "", expiry: "", cvc: "" });
    setIsAddingCard(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Buyurtma ma'lumotlari</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mahsulot</TableHead>
                <TableHead>Narxi</TableHead>
                <TableHead>Miqdori</TableHead>
                <TableHead className="text-right">Jami</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>
                    {item.product.price.toLocaleString()} so'm
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {(item.product.price * item.quantity).toLocaleString()} so'm
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="font-bold">Jami summa:</p>
          <p className="font-bold">{totalAmount.toLocaleString()} so'm</p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>To'lov usuli</CardTitle>
          <CardDescription>Qanday to'lashni xohlaysiz?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Karta orqali</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash">Naqd pul bilan</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {paymentMethod === "card" && (
        <Card>
          <CardHeader>
            <CardTitle>To'lov kartasi</CardTitle>
            <CardDescription>
              To'lov kartasini tanlang yoki yangi karta qo'shing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={selectedCard?.toString()}
              onValueChange={(value) => setSelectedCard(Number(value))}
            >
              {cards.map((card: any) => (
                <div key={card.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={card.id.toString()}
                    id={`card-${card.id}`}
                  />
                  <Label htmlFor={`card-${card.id}`}>
                    ****.****.****.{card.number.slice(-4)} (Amal.qilish.muddati:{" "}
                    {card.date.slice(0, 2)}/{card.date.slice(3, 5)})
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    router.push("profile");
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Yangi karta qo'shish
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Yangi karta qo'shish</DialogTitle>
                  <DialogDescription>
                    Yangi karta ma'lumotlarini kiriting. Karta ma'lumotlaringiz
                    xavfsiz saqlanadi.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="new-card-number" className="text-right">
                      Karta raqami
                    </Label>
                    <Input
                      id="new-card-number"
                      value={newCard.number}
                      onChange={(e) =>
                        setNewCard({ ...newCard, number: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="new-card-expiry" className="text-right">
                      Amal qilish muddati
                    </Label>
                    <Input
                      id="new-card-expiry"
                      value={newCard.expiry}
                      onChange={(e) =>
                        setNewCard({ ...newCard, expiry: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="new-card-cvc" className="text-right">
                      CVC
                    </Label>
                    <Input
                      id="new-card-cvc"
                      value={newCard.cvc}
                      onChange={(e) =>
                        setNewCard({ ...newCard, cvc: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={handleAddCard}>
                    Kartani qo'shish
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}

      <Textarea
        placeholder="Qo'shimcha manzil ma'lumotlari (ixtiyoriy)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <CreditCard className="mr-2 h-4 w-4 animate-spin" />
            Buyurtma qilinmoqda...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Buyurtma berish
          </>
        )}
      </Button>
    </form>
  );
}
function setCards(arg0: any[]) {
  throw new Error("Function not implemented.");
}
