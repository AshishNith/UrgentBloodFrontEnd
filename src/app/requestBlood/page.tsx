"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { Header } from "@/components/Header";
import { Donors } from "@/components/SearchDonors"; // Import the Donors component

export default function FindNearbyDonorsPage() {
  const [formData, setFormData] = useState({
    address: "",
    bloodType: "",
  });
  const [showDonors, setShowDonors] = useState(false); // State to control rendering of Donors component
  const [isSearched, setIsSearched] = useState(false); // State to track if search is clicked

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.address || !formData.bloodType) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Show the Donors component and update button/style states
    setShowDonors(true);
    setIsSearched(true); // Mark that search has been clicked
    toast.success(`Showing nearby donors with blood type ${formData.bloodType}.`);
  };

  // TypewriterEffect words
  const words = [
    { text: "Find" },
    { text: "Nearby" },
    { text: "Donors", className: "text-blue-500 dark:text-blue-500" },
  ];

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="text-center mb-8">
          <TypewriterEffect words={words} />
        </div>

        <div
          className={`w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 ${
            isSearched ? "" : "transform transition-all hover:scale-105"
          }`}
        >
          {/* Search Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter your address"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Blood Type */}
            <div>
              <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Blood Type
              </label>
              <select
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full px-4 py-2 ${
                isSearched
                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              } text-white rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {isSearched ? "Search Again" : "Search Nearby Donors"}
            </button>
          </form>

          {/* Conditionally Render Donors Component */}
          {showDonors && <Donors bloodType={formData.bloodType} />}
        </div>
      </div>
    </>
  );
}