import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search-donors" className="hover:text-red-500 transition-colors">
                  Search Donors
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-red-500 transition-colors">
                  Register as Donor
                </Link>
              </li>
              <li>
                <Link href="/emergency-request" className="hover:text-red-500 transition-colors">
                  Emergency Request
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: support@bloodproject.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: Himadir Boys Hostel, NIT Hamirpur</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p>&copy; {new Date().getFullYear()}, Made with ❤️ by Piyush Sangam</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;