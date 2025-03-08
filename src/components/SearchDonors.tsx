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

  const donors = [
    // A+ Donors
    { name: "Rahul Sharma", age: 28, gender: "Male", bloodType: "A+", distance: "2.3km" },
    { name: "Priya Patel", age: 25, gender: "Female", bloodType: "A+", distance: "4.5km" },
    { name: "Amit Singh", age: 30, gender: "Male", bloodType: "A+", distance: "1.2km" },
    { name: "Neha Gupta", age: 22, gender: "Female", bloodType: "A+", distance: "3.8km" },
    { name: "Vikram Yadav", age: 35, gender: "Male", bloodType: "A+", distance: "5.9km" },
  
    // A- Donors
    { name: "Anjali Desai", age: 27, gender: "Female", bloodType: "A-", distance: "3.0km" },
    { name: "Rajesh Kumar", age: 40, gender: "Male", bloodType: "A-", distance: "6.5km" },
    { name: "Sneha Mishra", age: 29, gender: "Female", bloodType: "A-", distance: "7.1km" },
  
    // B+ Donors
    { name: "Ravi Malhotra", age: 34, gender: "Male", bloodType: "B+", distance: "8.2km" },
    { name: "Sunita Reddy", age: 26, gender: "Female", bloodType: "B+", distance: "4.0km" },
    { name: "Arun Khanna", age: 38, gender: "Male", bloodType: "B+", distance: "5.5km" },
    { name: "Meena Kapoor", age: 24, gender: "Female", bloodType: "B+", distance: "9.0km" },
    { name: "Vivek Bhatia", age: 33, gender: "Male", bloodType: "B+", distance: "2.7km" },
  
    // B- Donors
    { name: "Pooja Mehta", age: 29, gender: "Female", bloodType: "B-", distance: "3.4km" },
    { name: "Sanjay Rao", age: 36, gender: "Male", bloodType: "B-", distance: "8.8km" },
    { name: "Anita Choudhary", age: 23, gender: "Female", bloodType: "B-", distance: "6.9km" },
    { name: "Rakesh Nair", age: 37, gender: "Male", bloodType: "B-", distance: "2.1km" },
    { name: "Divya Iyer", age: 28, gender: "Female", bloodType: "B-", distance: "7.7km" },
  
    // O+ Donors
    { name: "Rahul Mehta", age: 30, gender: "Male", bloodType: "O+", distance: "5.6km" },
    { name: "Priya Reddy", age: 26, gender: "Female", bloodType: "O+", distance: "9.3km" },
    { name: "Amit Khanna", age: 32, gender: "Male", bloodType: "O+", distance: "6.0km" },
    { name: "Neha Kapoor", age: 24, gender: "Female", bloodType: "O+", distance: "1.5km" },
    { name: "Vikram Bhatia", age: 35, gender: "Male", bloodType: "O+", distance: "4.9km" },
  
    // O- Donors
    { name: "Anjali Nair", age: 27, gender: "Female", bloodType: "O-", distance: "2.8km" },
    { name: "Rajesh Iyer", age: 40, gender: "Male", bloodType: "O-", distance: "3.2km" },
    { name: "Sneha Rao", age: 29, gender: "Female", bloodType: "O-", distance: "5.0km" },
    { name: "Deepak Malhotra", age: 32, gender: "Male", bloodType: "O-", distance: "7.3km" },
    { name: "Kavita Bhatia", age: 31, gender: "Female", bloodType: "O-", distance: "4.7km" },
  
    // AB+ Donors
    { name: "Rahul Yadav", age: 28, gender: "Male", bloodType: "AB+", distance: "3.6km" },
    { name: "Priya Sharma", age: 25, gender: "Female", bloodType: "AB+", distance: "8.5km" },
    { name: "Amit Patel", age: 30, gender: "Male", bloodType: "AB+", distance: "1.9km" },
    { name: "Neha Singh", age: 22, gender: "Female", bloodType: "AB+", distance: "6.4km" },
    { name: "Vikram Gupta", age: 35, gender: "Male", bloodType: "AB+", distance: "7.8km" },
  
    // AB- Donors
    { name: "Anjali Yadav", age: 27, gender: "Female", bloodType: "AB-", distance: "5.2km" },
    { name: "Rajesh Sharma", age: 40, gender: "Male", bloodType: "AB-", distance: "9.1km" },
    { name: "Sneha Patel", age: 29, gender: "Female", bloodType: "AB-", distance: "4.3km" },
    { name: "Deepak Singh", age: 32, gender: "Male", bloodType: "AB-", distance: "2.0km" },
    { name: "Kavita Gupta", age: 31, gender: "Female", bloodType: "AB-", distance: "3.9km" },
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