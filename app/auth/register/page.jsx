"use client";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Logo from "@/app/components/Logo";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [alreadyExists, setalreadyExists] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await axios.post("/api/auth/register", data);
    console.log(res);

    if (res.data.alreadyExists) setalreadyExists(true);
    else if (res.data.success) {
      router.push("/");
    } else {
      alert("Something went wrong try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-(--background-color) p-4">
      {/* Logo */}
      <Logo />

      {/* Form Container */}
      <div className="w-full max-w-md mt-8 p-6 bg-(--card-background) rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-(--primary-color) mb-6 text-center">
          Register Now!
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-(--subtext-color)">
              Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              {...register("name")}
              required
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-(--primary-color)"
            />
          </div>

          {/* Gmail */}
          <div className="flex flex-col">
            <label htmlFor="gmail" className="mb-1 text-(--subtext-color)">
              Gmail:
            </label>
            <input
              type="email"
              id="gmail"
              placeholder="example123@gmail.com"
              {...register("gmail")}
              required
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-(--primary-color)"
            />
            {alreadyExists && (
              <p className="text-(--error-color) text-sm mt-2 font-medium">
                This email is already registered. Please try logging in or use a
                different email.
              </p>
            )}
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
              {...register("password", {
                maxLength: { value: 15, message: "Password too long." },
                minLength: { value: 5, message: "Password too short" },
                pattern: {
                  value: /^\S*$/,
                  message: "Password cannot contain spaces.",
                },
              })}
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
            {errors.password && (
              <p className="text-(--error-color) text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-(--primary-color) cursor-pointer text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
