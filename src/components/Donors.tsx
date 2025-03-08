"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";

export const Donors = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});
  const [notifications, setNotifications] = useState<any[]>([]);

  // Load notifications from localStorage on component mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('bloodRequests');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  const sendNotificationToDonor = (donor: typeof donors[0]) => {
    const notification = {
      id: Date.now(),
      donorId: donor.id,
      donorName: donor.name,
      bloodType: donor.bloodType,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Save to localStorage
    const existingNotifications = JSON.parse(localStorage.getItem('bloodRequests') || '[]');
    const updatedNotifications = [...existingNotifications, notification];
    localStorage.setItem('bloodRequests', JSON.stringify(updatedNotifications));
    
    // Update state
    setNotifications(updatedNotifications);
    
    // Simulate notification delay
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleRequestClick = async (donor: typeof donors[0], index: number) => {
    setLoadingStates(prev => ({ ...prev, [index]: true }));
    
    try {
      await sendNotificationToDonor(donor);
      toast.success(`Request sent to ${donor.name}! They will be notified immediately.`);
      
      // Show notification count
      const count = notifications.length + 1;
      toast(`You have sent ${count} blood request${count > 1 ? 's' : ''} so far.`);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoadingStates(prev => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-2 mb-6">
      <h1 className="text-3xl font-bold text-center mb-8 pt-10">Donors Nearby You</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donors.map((donor, idx) => (
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
                onClick={() => handleRequestClick(donor, idx)}
                disabled={loadingStates[idx]}
                className={`mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors w-full ${
                  loadingStates[idx] ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loadingStates[idx] ? 'Sending Request...' : 'Emergency Request'}
              </button>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Update the donors array to include IDs
const donors = [
  {
    id: 1, // Add IDs to all donor objects
    name: "Rahul Sharma",
    age: 28,
    gender: "Male",
    bloodType: "O+",
    distance: "0.5km",
  },
  {
    id: 2,
    name: "Priya Patel",
    age: 25,
    gender: "Female",
    bloodType: "A+",
    distance: "0.8km",
  },
  {
    id: 3,
    name: "Amit Singh",
    age: 30,
    gender: "Male",
    bloodType: "B+",
    distance: "0.3km",
  },
  {
    id: 4,
    name: "Neha Gupta",
    age: 22,
    gender: "Female",
    bloodType: "AB+",
    distance: "0.7km",
  },
  {
    id: 5,
    name: "Vikram Yadav",
    age: 35,
    gender: "Male",
    bloodType: "O-",
    distance: "0.9km",
  },
  {
    id: 6,
    name: "Anjali Desai",
    age: 27,
    gender: "Female",
    bloodType: "A-",
    distance: "0.6km",
  },
  {
    id: 7,
    name: "Rajesh Kumar",
    age: 40,
    gender: "Male",
    bloodType: "B-",
    distance: "0.4km",
  },
  {
    id: 8,
    name: "Sneha Mishra",
    age: 29,
    gender: "Female",
    bloodType: "AB-",
    distance: "0.2km",
  },
  {
    id: 9,
    name: "Deepak Verma",
    age: 32,
    gender: "Male",
    bloodType: "O+",
    distance: "0.1km",
  },
];