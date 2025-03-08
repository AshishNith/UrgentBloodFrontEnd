"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useState } from "react";

export const Donors = ({ bloodType }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleRequestClick = () => {
    toast.success("Request sent successfully!");
  };

  // Dummy Donors Data
  const donors = [
    // A+ Donors
    {
      name: "Rahul Sharma",
      age: 28,
      gender: "Male",
      bloodType: "A+",
      distance: "0.5km",
    },
    {
      name: "Priya Patel",
      age: 25,
      gender: "Female",
      bloodType: "A+",
      distance: "0.8km",
    },
    {
      name: "Amit Singh",
      age: 30,
      gender: "Male",
      bloodType: "A+",
      distance: "0.3km",
    },
    {
      name: "Neha Gupta",
      age: 22,
      gender: "Female",
      bloodType: "A+",
      distance: "0.7km",
    },
    {
      name: "Vikram Yadav",
      age: 35,
      gender: "Male",
      bloodType: "A+",
      distance: "0.9km",
    },

    // A- Donors
    {
      name: "Anjali Desai",
      age: 27,
      gender: "Female",
      bloodType: "A-",
      distance: "0.6km",
    },
    {
      name: "Rajesh Kumar",
      age: 40,
      gender: "Male",
      bloodType: "A-",
      distance: "0.4km",
    },
    {
      name: "Sneha Mishra",
      age: 29,
      gender: "Female",
      bloodType: "A-",
      distance: "0.2km",
    },

    // B+ Donors
    {
      name: "Ravi Malhotra",
      age: 34,
      gender: "Male",
      bloodType: "B+",
      distance: "1.5km",
    },
    {
      name: "Sunita Reddy",
      age: 26,
      gender: "Female",
      bloodType: "B+",
      distance: "1.0km",
    },
    {
      name: "Arun Khanna",
      age: 38,
      gender: "Male",
      bloodType: "B+",
      distance: "0.7km",
    },
    {
      name: "Meena Kapoor",
      age: 24,
      gender: "Female",
      bloodType: "B+",
      distance: "0.9km",
    },
    {
      name: "Vivek Bhatia",
      age: 33,
      gender: "Male",
      bloodType: "B+",
      distance: "1.1km",
    },

    // B- Donors
    {
      name: "Pooja Mehta",
      age: 29,
      gender: "Female",
      bloodType: "B-",
      distance: "0.8km",
    },
    {
      name: "Sanjay Rao",
      age: 36,
      gender: "Male",
      bloodType: "B-",
      distance: "0.6km",
    },
    {
      name: "Anita Choudhary",
      age: 23,
      gender: "Female",
      bloodType: "B-",
      distance: "1.3km",
    },
    {
      name: "Rakesh Nair",
      age: 37,
      gender: "Male",
      bloodType: "B-",
      distance: "0.4km",
    },
    {
      name: "Divya Iyer",
      age: 28,
      gender: "Female",
      bloodType: "B-",
      distance: "0.5km",
    },

    // O+ Donors
    {
      name: "Rahul Mehta",
      age: 30,
      gender: "Male",
      bloodType: "O+",
      distance: "0.5km",
    },
    {
      name: "Priya Reddy",
      age: 26,
      gender: "Female",
      bloodType: "O+",
      distance: "0.8km",
    },
    {
      name: "Amit Khanna",
      age: 32,
      gender: "Male",
      bloodType: "O+",
      distance: "0.3km",
    },
    {
      name: "Neha Kapoor",
      age: 24,
      gender: "Female",
      bloodType: "O+",
      distance: "0.7km",
    },
    {
      name: "Vikram Bhatia",
      age: 35,
      gender: "Male",
      bloodType: "O+",
      distance: "0.9km",
    },

    // O- Donors
    {
      name: "Anjali Nair",
      age: 27,
      gender: "Female",
      bloodType: "O-",
      distance: "0.6km",
    },
    {
      name: "Rajesh Iyer",
      age: 40,
      gender: "Male",
      bloodType: "O-",
      distance: "0.4km",
    },
    {
      name: "Sneha Rao",
      age: 29,
      gender: "Female",
      bloodType: "O-",
      distance: "0.2km",
    },
    {
      name: "Deepak Malhotra",
      age: 32,
      gender: "Male",
      bloodType: "O-",
      distance: "0.1km",
    },
    {
      name: "Kavita Bhatia",
      age: 31,
      gender: "Female",
      bloodType: "O-",
      distance: "1.2km",
    },

    // AB+ Donors
    {
      name: "Rahul Yadav",
      age: 28,
      gender: "Male",
      bloodType: "AB+",
      distance: "0.5km",
    },
    {
      name: "Priya Sharma",
      age: 25,
      gender: "Female",
      bloodType: "AB+",
      distance: "0.8km",
    },
    {
      name: "Amit Patel",
      age: 30,
      gender: "Male",
      bloodType: "AB+",
      distance: "0.3km",
    },
    {
      name: "Neha Singh",
      age: 22,
      gender: "Female",
      bloodType: "AB+",
      distance: "0.7km",
    },
    {
      name: "Vikram Gupta",
      age: 35,
      gender: "Male",
      bloodType: "AB+",
      distance: "0.9km",
    },

    // AB- Donors
    {
      name: "Anjali Yadav",
      age: 27,
      gender: "Female",
      bloodType: "AB-",
      distance: "0.6km",
    },
    {
      name: "Rajesh Sharma",
      age: 40,
      gender: "Male",
      bloodType: "AB-",
      distance: "0.4km",
    },
    {
      name: "Sneha Patel",
      age: 29,
      gender: "Female",
      bloodType: "AB-",
      distance: "0.2km",
    },
    {
      name: "Deepak Singh",
      age: 32,
      gender: "Male",
      bloodType: "AB-",
      distance: "0.1km",
    },
    {
      name: "Kavita Gupta",
      age: 31,
      gender: "Female",
      bloodType: "AB-",
      distance: "1.2km",
    },
  ];

  // Filter donors based on the selected blood type
  const filteredDonors = donors.filter((donor) => donor.bloodType === bloodType);

  return (
    <div className="max-w-6xl mx-auto px-2 mb-6">
      <h1 className="text-3xl font-bold text-center mb-8 pt-10">
        Donors with Blood Type {bloodType}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonors.map((donor, idx) => (
          <div
            key={idx}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200 relative z-20"
            >
              <h2 className="text-xl font-bold text-black">{donor.name}</h2>
              <p className="text-neutral-600 mt-2">Age: {donor.age}</p>
              <p className="text-neutral-600">Gender: {donor.gender}</p>
              <p className="text-neutral-600 font-bold">Blood Type: {donor.bloodType}</p>
              <p className="text-neutral-600 flex items-center mt-2">
                <FaMapMarkerAlt className="inline-block mr-1" />
                {donor.distance} away from you
              </p>
              <button
                onClick={handleRequestClick}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors w-full"
              >
                Emergency Request
              </button>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};