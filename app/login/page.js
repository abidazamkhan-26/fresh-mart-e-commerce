"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const [userData, SetUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Input validation
  const validateInput = () => {
    const newErrors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!userData.password) {
      newErrors.password = "Password is required";
    } else if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handelLogin = async (e) => {
    e.preventDefault();
    
    // Validate input before sending
    if (!validateInput()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("https://fdr-food-api.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email.trim(),
          password: userData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors securely without exposing sensitive info
        const errorMessage = data.message || "Login failed. Please check your credentials.";
        toast.error(errorMessage);
        return;
      }

      // Validate response has token
      if (!data.token || typeof data.token !== 'string') {
        toast.error("Invalid response from server");
        return;
      }

      // Set cookie securely via API route
      const cookieResponse = await fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: data.token }),
      });

      if (!cookieResponse.ok) {
        toast.error("Failed to set authentication cookie");
        return;
      }

      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      // Don't expose error details to users
      toast.error("An error occurred. Please try again later.");
      // Log error server-side only (in production, use proper logging service)
      if (process.env.NODE_ENV === 'development') {
        console.error("Login error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer position="top-right" theme="light" />
      <div className="w-full max-w-lg px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="flex items-center space-x-5 justify-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400 text-center">
            Login to our account
          </h2>
        </div>
        <form className="space-y-4">
          <div className="mt-5">
            <div className="flex items-center justify-start gap-25">
              <label
                className="font-semibold text-sm text-gray-600 block"
                htmlFor="login"
              >
                E-mail
              </label>
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full">
              <CiMail className="text-xl font-bold" />
              <input
                className="pl-2 text-sm w-full outline-none"
                onChange={(e) => {
                  SetUserData((prev) => ({ ...prev, email: e.target.value }));
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                type="email"
                id="login"
                placeholder="Type your email address"
                required
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mb-3">{errors.email}</p>
            )}
            <div className="flex items-center justify-start gap-17">
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full">
              <CiLock className="text-xl font-bold" />
              <input
                className="pl-2 text-sm w-full outline-none"
                onChange={(e) => {
                  SetUserData((prev) => ({ ...prev, password: e.target.value }));
                  if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                }}
                type="password"
                id="password"
                placeholder="••••••••"
                required
                minLength={6}
                disabled={isLoading}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mb-3">{errors.password}</p>
            )}
          </div>
          {/* <div className="flex items-center justify-between mb-4">
            <label
              htmlFor="remember-me"
              className="text-sm text-gray-900 cursor-pointer gap-1 flex items-center"
            >
              <input type="checkbox" id="remember-me" />
              Remember me
            </label>
            <Link
              href="/forgotpassword"
              className="text-xs font-display font-semibold text-gray-500 hover:text-gray-600 cursor-pointer"
            >
              Forgot Password?
            </Link>
          </div> */}
          <div className="flex flex-col gap-2 mt-5">
            <button
              onClick={handelLogin}
              disabled={isLoading}
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            <Link
              href="/registration"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or sign up
            </Link>
            <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
