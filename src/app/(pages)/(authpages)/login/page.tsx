"use client";

import React from "react";
import Navbar from "@/component/navbar";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";


type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    
    try {
      const response = await axios.post("/api/auth/login", data);

      if (response.data.success) {
        const userData = response.data.data.userData;
        console.log(userData);
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-6 sm:p-9 rounded-xl shadow-xl space-y-8 sm:space-y-8 relative bg-white/90 backdrop-blur-sm">
          <div>
            <h2 className="text-center text-3xl sm:text-3xl font-bold tracking-tight text-blue-600">
              Welcome Back!
            </h2>
            <p className="text-center text-md sm:text-sm mt-2 text-gray-600">
              Login to your account
            </p>
          </div>

          <form
            className="mt-6 sm:mt-8 space-y-4 sm:space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-4 sm:space-y-7 rounded-md">
              <div>
                <label
                  htmlFor="email"
                  className="block text-md ml-2 sm:text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 sm:mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-md sm:text-base text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:outline-none focus:ring-blue-600"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-md ml-2 sm:text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="mt-1 sm:mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:outline-none focus:ring-blue-600"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="text-center mt-6 mb-6">
              <p className="text-md sm:text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-md sm:text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-200"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
