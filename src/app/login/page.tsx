"use client";

  import { useState } from "react";
  import Link from "next/link";
  import { toast } from "react-hot-toast";
  import { useRouter } from "next/navigation";
  import { Header } from "@/components/Header";

  export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
    
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data.error || "Login failed");
        }
    
        // Save token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name || "Guest"); // Ensure a default value for username
        toast.success("Login successful!");
    
        // Redirect to dashboard
        router.push("/");
      } catch (error: unknown) {
        const errorMessage = (error as Error).message || "An error occurred. Please try again.";
        toast.error(errorMessage);
        console.error("Login Error:", error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-6">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 transform transition-all hover:scale-105">
            {/* Login Heading */}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
              Login
            </h1>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Forgot Password and Signup Links */}
            <div className="mt-6 text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot Password?
              </Link>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }