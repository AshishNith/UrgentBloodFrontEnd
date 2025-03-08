"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

export const Header = ({ className }: { className?: string }) => {
  // Navbar items
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "flex max-w-fit fixed top-5 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black/50 bg-white/50 shadow-md z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4 backdrop-blur-sm",
        className
      )}
    >
      {/* Render Navbar Items */}
      {navItems.map((navItem, idx) => (
        <Link
          key={idx}
          href={navItem.link}
          className="relative dark:text-neutral-50 flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden sm:block text-sm">{navItem.name}</span>
        </Link>
      ))}

      {/* Login Button */}
      <Link
        href="/login"
        className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
      >
        <span>Login</span>
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
      </Link>
    </motion.div>
  );
};