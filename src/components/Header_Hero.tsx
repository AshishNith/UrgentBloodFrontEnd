"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function FloatingNavDemo() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`flex max-w-fit fixed top-5 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black/50 bg-white/50 shadow-md z-[5000] pr-2 pl-8 py-2 items-center justify-between backdrop-blur-sm ${isVisible ? 'block' : 'hidden'}`}
    >
      {/* Logo */}
      {/* <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
        UrgentBlood
      </Link> */}

      {/* Navigation Links */}
      <nav className="flex items-center space-x-6">
        <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
          Home
        </Link>
        <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
          About
        </Link>
        <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
          Contact
        </Link>

        {/* Conditional Rendering */}
        {userName ? (
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 transition-all"
          >
            Login
          </Link>
        )}
      </nav>
    </motion.header>
  );
}

export { FloatingNavDemo };