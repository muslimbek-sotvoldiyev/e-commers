"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLoginMutation } from "@/lib/service/authApi";
import { useRouter } from "next/navigation";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
  className?: string;
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const saveToLocalStorage = (data: {
    accessToken: string;
    refreshToken: string;
    user: any;
  }) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login(formData).unwrap();

      if (result && result.accessToken) {
        saveToLocalStorage(result);
        router.push("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      if (typeof err === "object" && err !== null && "data" in err) {
        setError((err.data as any).message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <form
      className={cn("grid gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>

      <div className="relative text-center">
        <span className="bg-background px-2 text-sm text-muted-foreground">
          Or continue with
        </span>
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>

      <Button variant="outline" className="w-full" disabled={isLoading}>
        <GithubIcon className="mr-2 h-4 w-4" />
        Login with GitHub
      </Button>

      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </p>
    </form>
  );
}
