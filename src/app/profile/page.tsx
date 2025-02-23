"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useUpdateMeMutation,
  useGetMeQuery,
  useGetCardInfoQuery,
  useDeleteCardMutation,
  useAddCardMutation,
  useGetOrderQuery,
} from "@/lib/service/api";
import useAuth from "@/hooks/auth";

export default function UserProfile() {
  useAuth();
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingCard, setEditingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    date: "",
    cvv: "",
    full_name: "",
  });
  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editedUserData, setEditedUserData] = useState<any>(null);

  const {
    data: userData,
    isError: isUserError,
    isLoading: isUserLoading,
    refetch: MeeRefetch,
  } = useGetMeQuery({});
  const {
    data: cardData,
    isLoading: isCardLoading,
    refetch: Cardrefetch,
  } = useGetCardInfoQuery({});
  const { data: orderData, isLoading: isOrderLoading } = useGetOrderQuery();
  const [updateMe] = useUpdateMeMutation();
  const [deleteCard] = useDeleteCardMutation();
  const [addCard] = useAddCardMutation();

  useEffect(() => {
    if (userData) {
      setEditedUserData(userData);
    }
  }, [userData]);

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("first_name", editedUserData.first_name);
      formData.append("second_name", editedUserData.second_name);
      formData.append("email", editedUserData.email);

      if (newPhoto) {
        // If newPhoto is a base64 string, convert it to a Blob
        if (typeof newPhoto === "string" && newPhoto.startsWith("data:image")) {
          const response = await fetch(newPhoto);
          const blob = await response.blob();
          formData.append("photo", blob, "profile.jpg");
        } else {
          // If it's already a File object, just append it
          formData.append("photo", newPhoto);
        }
      }

      await updateMe(formData).unwrap();
      setEditingPersonal(false);
      setNewPhoto(null);
      MeeRefetch();
    } catch (error) {
      console.error("Failed to update user info:", error);
    }
  };

  const handleDeleteCard = async (id: number) => {
    try {
      await deleteCard({ id }).unwrap();
      Cardrefetch();
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openGoogleMaps = (lat: number, long: number) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${long}`,
      "_blank"
    );
  };

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cardData = { ...newCard };
      if (!cardData.cvv) {
        delete cardData.cvv;
      }
      await addCard(cardData).unwrap();
      setNewCard({ number: "", date: "", cvv: "", full_name: "" });
      setEditingCard(false);
      Cardrefetch();
    } catch (error) {
      console.error("Failed to add card:", error);
    }
  };

  if (isUserLoading || isCardLoading || isOrderLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-1/4 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isUserError) {
    return <div>Error loading user data</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            {editingPersonal ? (
              <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage
                        src={
                          newPhoto || `http://localhost:4000/${userData.photo}`
                        }
                        alt={`${userData.first_name} ${userData.second_name}`}
                      />
                      <AvatarFallback>
                        {userData.first_name[0]}
                        {userData.second_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute bottom-0 right-0"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Change
                    </Button>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handlePhotoChange}
                    />
                  </div>
                  <div className="space-y-2 flex-grow">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={editedUserData?.first_name || ""}
                      onChange={(e) =>
                        setEditedUserData({
                          ...editedUserData,
                          first_name: e.target.value,
                        })
                      }
                    />
                    <Label htmlFor="second_name">Last Name</Label>
                    <Input
                      id="second_name"
                      value={editedUserData?.second_name || ""}
                      onChange={(e) =>
                        setEditedUserData({
                          ...editedUserData,
                          second_name: e.target.value,
                        })
                      }
                    />
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedUserData?.email || ""}
                      onChange={(e) =>
                        setEditedUserData({
                          ...editedUserData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="submit">Save</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingPersonal(false);
                      setNewPhoto(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col md:flex-row items-start gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={`http://localhost:4000/${userData.photo}`}
                    alt={`${userData.first_name} ${userData.second_name}`}
                  />
                  <AvatarFallback>
                    {userData.first_name[0]}
                    {userData.second_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {userData.first_name}{" "}
                    {userData.second_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Member since:</strong>{" "}
                    {new Date(userData.createdAt).toLocaleDateString()}
                  </p>
                  <Button onClick={() => setEditingPersonal(true)}>
                    Edit Information
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-4">
              {cardData?.map((card: any) => (
                <li key={card.id} className="flex justify-between items-center">
                  <span>
                    •••• {card.number.slice(-4)} ({card.date})
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
            {editingCard ? (
              <form onSubmit={handleAddCard} className="space-y-4">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={newCard.number}
                  onChange={(e) =>
                    setNewCard({ ...newCard, number: e.target.value })
                  }
                  placeholder="1234 5678 9012 3456"
                />
                <Label htmlFor="cardDate">Expiry Date</Label>
                <Input
                  id="cardDate"
                  value={newCard.date}
                  onChange={(e) =>
                    setNewCard({ ...newCard, date: e.target.value })
                  }
                  placeholder="MM YY"
                />
                <Label htmlFor="cardCVV">CVV</Label>
                <Input
                  id="cardCVV"
                  value={newCard.cvv}
                  onChange={(e) =>
                    setNewCard({ ...newCard, cvv: e.target.value })
                  }
                  placeholder="123"
                  maxLength={3}
                />
                <Label htmlFor="cardName">Full Name</Label>
                <Input
                  id="cardName"
                  value={newCard.full_name}
                  onChange={(e) =>
                    setNewCard({ ...newCard, full_name: e.target.value })
                  }
                  placeholder="John Doe"
                />
                <div className="flex justify-end space-x-2">
                  <Button type="submit">Add Card</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingCard(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <Button onClick={() => setEditingCard(true)}>Add New Card</Button>
            )}
          </CardContent>
        </Card>

        {/* User Orders */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Order ID</th>
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Total</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Items</th>
                    <th className="text-left py-2">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-2">#{order.id}</td>
                      <td className="py-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2">${order.totalPrice.toFixed(2)}</td>
                      <td className="py-2">
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-2">
                        {order.orderItems.map((item) => (
                          <div key={item.id}>
                            {item.product.name} x {item.count}
                          </div>
                        ))}
                      </td>
                      <td className="py-2">
                        <Button
                          onClick={() => openGoogleMaps(order.lat, order.long)}
                          variant="outline"
                          size="sm"
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          View Location
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
