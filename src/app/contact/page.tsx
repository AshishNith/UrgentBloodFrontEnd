"use client";

import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { Header } from "@/components/Header";

export default function ContactPage() {
  return (

    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 transform transition-all hover:scale-105">
        {/* Profile Picture and Introduction */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <Image
              src="/profile.jpeg" // Path to your profile picture
              alt="Piyush Kumar Sangam"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
            Piyush Kumar Sangam
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            2nd Year Student at NIT Hamirpur | Next.js & MERN Stack Developer
          </p>
        </div>

        {/* About Me Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Hi, I&apos;m Piyush Kumar Sangam, a passionate developer currently pursuing my Bachelor&apos;s degree at NIT Hamirpur. I specialize in building modern web applications using the Next.js framework and the MERN (MongoDB, Express.js, React.js, Node.js) stack. I love solving real-world problems through technology and am always eager to learn and grow as a developer.
          </p>
        </div>

        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* LinkedIn Button */}
          <Link
            href="https://www.linkedin.com/in/piyush-kumar-sangam-7a3b5b2b0/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
          >
            <FaLinkedin className="text-xl mr-2" />
            LinkedIn Profile
          </Link>

          {/* Email Button */}
          <Link
            href="mailto:piyushsangam2004@gmail.com"
            className="flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg"
          >
            <FaEnvelope className="text-xl mr-2" />
            Email Me
          </Link>

          {/* Phone Button */}
          <Link
            href="tel:+919896543210"
            className="flex items-center justify-center px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg"
          >
            <FaPhone className="text-xl mr-2" />
            Call Me
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}