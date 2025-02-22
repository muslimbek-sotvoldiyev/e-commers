"use client";

import type React from "react";
import { useState, useRef } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const message = `
      📩 Yangi xabar!
      👤 Ism: ${formData.get("name")}
      📧 Email: ${formData.get("email")}
      💬 Xabar: ${formData.get("message")}
    `;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.description || "Xatolik yuz berdi");

      toast.success("Xabar yuborildi! Tez orada siz bilan bog‘lanamiz.");
      formRef.current?.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error.message ||
            "Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring."
        );
      } else {
        toast.error("Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10"
      style={{
        backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
      }}
    >
      <Toaster />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white bg-opacity-90 rounded-lg overflow-hidden shadow-xl">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-center mb-6 text-primary">
              Contact Us
            </h1>
            <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
              <div className="comic-panel">
                <label htmlFor="name" className="speech-bubble-label">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Manga Hero"
                  required
                  className="bg-white bg-opacity-75"
                />
              </div>
              <div className="comic-panel">
                <label htmlFor="email" className="speech-bubble-label">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="hero@mangaworld.com"
                  required
                  className="bg-white bg-opacity-75"
                />
              </div>
              <div className="comic-panel">
                <label htmlFor="message" className="speech-bubble-label">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us your manga story..."
                  required
                  className="bg-white bg-opacity-75"
                  rows={4}
                />
              </div>
              <Button
                type="submit"
                className="w-full text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Sending..."
                ) : (
                  <>
                    <SendHorizontal className="ml-2 h-5 w-5" /> Send Your
                    Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
