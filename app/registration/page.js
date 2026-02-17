"use client";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const [userData, SetUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Input validation
  const validateInput = () => {
    const newErrors = {};
    
    // Name validation
    if (!userData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (userData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(userData.name.trim())) {
      newErrors.name = "Name can only contain letters and spaces";
    }
    
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

  const handelSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input before sending
    if (!validateInput()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("https://fdr-food-api.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userData.name.trim(),
          email: userData.email.trim(),
          password: userData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors securely
        const errorMessage = data.message || "Registration failed. Please try again.";
        toast.error(errorMessage);
        return;
      }

      toast.success(data.message || "Registration successful!");
      
      // Clear form on success
      SetUserData({ name: "", email: "", password: "" });
    } catch (error) {
      // Don't expose error details to users
      toast.error("An error occurred. Please try again later.");
      // Log error server-side only
      if (process.env.NODE_ENV === 'development') {
        console.error("Registration error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen from-[#e0f7ff] to-[#ffffff]">
      <ToastContainer position="top-right" theme="light" />
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl px-8 py-10">
        <div className=" text-center mb-8">
          <h2 className="text-2xl font-semibold text-[#1a1a68]">
            Create an account
          </h2>
        </div>

        <form onSubmit={handelSubmit} className="space-y-4">
          <div className="input flex flex-col static">
            <label
              htmlFor="input"
              className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-white w-fit"
            >
              Email Address:
            </label>
            <input
              type="email"
              onChange={(e) => {
                SetUserData((prev) => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              placeholder="you@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="input flex flex-col static">
            <label
              htmlFor="input"
              className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-white w-fit"
            >
              User Name:
            </label>
            <input
              type="text"
              onChange={(e) => {
                SetUserData((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              placeholder="Your Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              minLength={2}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div className="input flex flex-col static">
            <label
              htmlFor="input"
              className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-white w-fit"
            >
              Password:
            </label>
            <input
              type="password"
              onChange={(e) => {
                SetUserData((prev) => ({ ...prev, password: e.target.value }));
                if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
              }}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              minLength={6}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#0275a6] to-[#025e87] text-white py-2 rounded-full font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?
          <Link href="/login" className="text-[#0275a6] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
