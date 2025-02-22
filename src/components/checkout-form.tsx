"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Plus } from "lucide-react";

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

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Card = {
  id: number;
  number: string;
  expiry: string;
};

// Namuna mahsulotlar
const cartItems: Product[] = [
  { id: 1, name: "Smartfon X", price: 1200000, quantity: 1 },
  { id: 2, name: "Simsiz quloqchin Y", price: 300000, quantity: 2 },
  { id: 3, name: "Quvvatlagich Z", price: 150000, quantity: 1 },
];

// Namuna saqlangan kartalar
const initialCards: Card[] = [
  { id: 1, number: "**** **** **** 1234", expiry: "12/24" },
  { id: 2, number: "**** **** **** 5678", expiry: "06/25" },
];

export default function CheckoutForm() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [newCard, setNewCard] = useState({ number: "", expiry: "", cvc: "" });
  const [isAddingCard, setIsAddingCard] = useState(false);

  // Umumiy summani hisoblash
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Bu yerda backendga ma'lumotlarni yuborish kerak
    console.log({
      paymentMethod,
      selectedCard: cards.find((card) => card.id === selectedCard),
      cartItems,
      totalAmount,
      // Xarita koordinatalari MapComponent dan olinadi
    });
    router.push("/order-confirmation");
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
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price.toLocaleString()} so'm</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {(item.price * item.quantity).toLocaleString()} so'm
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
              {cards.map((card) => (
                <div key={card.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={card.id.toString()}
                    id={`card-${card.id}`}
                  />
                  <Label htmlFor={`card-${card.id}`}>
                    {card.number} (Amal qilish muddati: {card.expiry})
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
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

      <Textarea placeholder="Qo'shimcha manzil ma'lumotlari (ixtiyoriy)" />

      <Button type="submit" className="w-full">
        <CreditCard className="mr-2 h-4 w-4" /> Buyurtma berish
      </Button>
    </form>
  );
}
