"use client";

import { ArrowLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const DEFAULT_USER = {
  first_name: "Foydalanuvchi",
  second_name: "",
  email: "user@example.com",
  profile_image: "/defaultprofile.png",
  gender: "Male",
  birthday: "12-12-2000",
  phone: "(307) 555-0133",
};

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(DEFAULT_USER);

  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedUser = localStorage.getItem("userData");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/" className="rounded-lg p-2 hover:bg-gray-100 md:hidden">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">Profil</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 space-y-6 lg:col-span-3">
          <div className="flex items-center gap-4">
            <img
              width={80}
              height={80}
              className="rounded-full bg-pink-100 object-cover"
              src={user.profile_image}
              alt="Profile"
            />

            <div>
              <h2 className="text-xl font-semibold">{user.first_name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="space-y-1 rounded-lg border bg-white">
            <Link
              href="/profile/gender"
              className="flex items-center justify-between border-b p-4"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Jins</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>{user.gender}</span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>

            <Link
              href="/profile/birthday"
              className="flex items-center justify-between border-b p-4"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Tug'ilgan sana</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>{user.birthday}</span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>

            <Link
              href="/profile/email"
              className="flex items-center justify-between border-b p-4"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Email</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>{user.email}</span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>

            <Link
              href="/profile/phone"
              className="flex items-center justify-between border-b p-4"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>Telefon raqam</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>{user.phone}</span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>

            <Link
              href="/profile/password"
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Parolni o'zgartirish</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>••••••••••••</span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
