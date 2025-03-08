"use client";

import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { FaHandHoldingHeart, FaMapMarkerAlt, FaWhatsapp, FaClock, FaTint } from "react-icons/fa";
import { Header } from "@/components/Header";

export default function AboutPage() {
  // TypewriterEffect words for the heading
  const words = [
    { text: "About" },
    { text: "Us", className: "text-blue-500 dark:text-blue-500" },
  ];

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 pt-24"> {/* Added pt-24 */}
      <div className="max-w-4xl mx-auto">
        {/* Heading with Typewriter Effect */}
        <div className="text-center mb-12">
          <TypewriterEffect words={words} />
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Revolutionizing the way blood donation and requests are handled.
          </p>
        </div>

        {/* Inspiration Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Our Inspiration
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            The idea for this project came from a personal experience. One of our team members needed emergency blood of a specific type, and it was incredibly difficult to find a donor in time. This made us realize how critical and challenging it is to connect blood donors with those in need during emergencies. We decided to create a platform that simplifies and revolutionizes the blood donation and request process, ensuring that no one has to face such difficulties again.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Our Motive (Features)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <FaHandHoldingHeart className="text-blue-500 text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Emergency Blood Requests
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                People can visit this website when they urgently need blood. Our platform connects them with nearby donors quickly and efficiently.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <FaTint className="text-blue-500 text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Donor Registration
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Blood donors can register themselves and log in to the platform. This allows them to be easily located during emergencies.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-blue-500 text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Live Donor Tracking
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Users can search for specific blood types and see the live location of registered donors on a map, powered by Google Maps API.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <FaWhatsapp className="text-blue-500 text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Emergency Requests via WhatsApp & SMS
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                In critical situations, users can send emergency requests directly to donors via WhatsApp and SMS.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <FaClock className="text-blue-500 text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Donor Availability Tracking
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Donors can only donate every 3 months unless it&apos;s an urgent situation. This ensures fairness and prevents misuse.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-blue-500 text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Nearby Blood Banks
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                If no donors are available, our platform suggests nearby blood banks with real-time stock data.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Join Us in Saving Lives
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Together, we can make a difference. Register as a donor or use our platform to find help when you need it most.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
    </>
  );
}