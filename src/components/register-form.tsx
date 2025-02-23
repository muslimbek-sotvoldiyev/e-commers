"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRegisterMutation } from "@/lib/service/authApi";
import { useRouter } from "next/navigation";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    first_name: "",
    second_name: "",
    email: "",
    password: "",
    avatar: null as File | null,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file" && e.target.files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        avatar: e.target.files![0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const handleRemoveAvatar = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: null,
    }));
  };

  const saveToLocalStorage = (data: any) => {
    localStorage.setItem("accessToken", data.savedUser.accessToken);
    localStorage.setItem("refreshToken", data.savedUser.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.savedUser.user));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("first_name", formData.first_name);
      formDataToSend.append("second_name", formData.second_name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);

      if (formData.avatar) {
        formDataToSend.append("photo", formData.avatar);
      } else {
        const defaultAvatarResponse = await fetch("/user.png");
        const defaultAvatarBlob = await defaultAvatarResponse.blob();
        formDataToSend.append("photo", defaultAvatarBlob, "default-avatar.png");
      }

      const result = await register(formDataToSend).unwrap();

      if (result && result.savedUser) {
        localStorage.setItem("accessToken", result.savedUser.accessToken);
        localStorage.setItem("refreshToken", result.savedUser.refreshToken);
        localStorage.setItem("user", JSON.stringify(result.savedUser.user));
        router.push("/");
      } else {
        setError("Ma'lumotlar saqlanmadi. Iltimos, qaytadan urunib ko'ring.");
      }
    } catch (err) {
      if (typeof err === "object" && err !== null && "data" in err) {
        setError((err.data as any).message || "Registration failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a new account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to register your account
        </p>
      </div>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            type="text"
            placeholder="John"
            required
            value={formData.first_name}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="second_name">Second Name</Label>
          <Input
            id="second_name"
            type="text"
            placeholder="Doe"
            required
            value={formData.second_name}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

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

        <div className="grid gap-2">
          <Label htmlFor="avatar">Profile Picture (Optional)</Label>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleChange}
            disabled={isLoading}
          />
          {formData.avatar && (
            <Button
              type="button"
              variant="outline"
              onClick={handleRemoveAvatar}
              disabled={isLoading}
            >
              Remove Avatar
            </Button>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
}
