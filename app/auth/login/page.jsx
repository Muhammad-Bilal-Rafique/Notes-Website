"use client";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Logo from "@/app/components/Logo";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, seterror] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      gmail: data.gmail,
      password: data.password,
    });
    if (res.error) seterror(res.error);
    else router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-(--background-color) p-4">
      {/* Logo */}
      <Logo />

      {/* Form Container */}
      <div className="w-full max-w-md mt-8 p-6 bg-(--card-background) rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-(--primary-color) mb-6 text-center">
          Login to your account!
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          {/* Gmail */}
          <div className="flex flex-col">
            <label htmlFor="gmail" className="mb-1 text-(--subtext-color)">
              Gmail:
            </label>
            <input
              type="email"
              id="gmail"
              placeholder="Your email..."
              {...register("gmail")}
              required
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-(--primary-color)"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="mb-1 text-(--subtext-color)">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Your Password"
              {...register("password")}
              required
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-(--primary-color)"
            />
            {/* Toggle Icon */}
            <div
              className="absolute right-2 top-9  cursor-pointer text-(--subtext-color)"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={25} />
              ) : (
                <AiOutlineEye size={25} />
              )}
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-(--primary-color) cursor-pointer text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
          >
            LogIn
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
