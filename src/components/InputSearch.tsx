"use client";

import { PlaceholdersAndVanishInput } from "@/components/placeholders-and-vanish-input";

export default function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "Search for blood donors near you...",
    "Enter your location to find donors...",
    "Looking for O+ blood in your area?",
    "Find donors by blood type and location...",
    "Need blood urgently? Start your search here...",
    "Search for A- donors nearby...",
    "Find lifesavers in your community...",
    "Enter your city or address to locate donors...",
    "Search for AB+ donors in your vicinity...",
    "Find blood donors in emergencies...",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="h-20 flex flex-col justify-center  items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
