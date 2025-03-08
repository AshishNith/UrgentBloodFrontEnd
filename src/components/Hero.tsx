"use client";

import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import Link from "next/link";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        One Innovation <br /> Can Save Millions of Lives
      </motion.h1>

      {/* Buttons Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col md:flex-row justify-center gap-4 mt-8"
      >
        <Link
          href="/donor"
          className="px-6 py-3 bg-red-600 text-white rounded-lg text-center font-semibold hover:bg-red-700 transition-colors"
        >
          Become a Donor
        </Link>
        <Link
          href="/requestBlood"
          className="px-6 py-3 bg-white text-red-600 rounded-lg text-center font-semibold hover:bg-gray-100 transition-colors"
        >
          Request Blood
        </Link>
      </motion.div>
    </LampContainer>
  );
}