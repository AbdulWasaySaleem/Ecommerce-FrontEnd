import React, { useState, useEffect } from "react";
import { Heart, User, Menu } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const { wishlist } = useShop();
  const { auth, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const quotes = [
    "Enjoy Big Savings Every Single Day Now!",
    "Find Best Deals on Top Brands Today!",
    "Shop Smart and Always Save Much More!",
    "Limited Time Offers Available, Grab Them Fast!",
    "Exclusive Discounts Just for You Right Away!"
  ];
  
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white shadow-md">
      {/* Quote Slider */}
      <div className="bg-black text-white py-1 text-center text-lg h-7 flex justify-center items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={quotes[currentQuoteIndex]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute"
          >
            {quotes[currentQuoteIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section: Logo */}
          <Link to="/" className="text-3xl font-bold">
            PriceDrop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-black hover:text-gray-900">
              Home
            </Link>
            <Link to="/brands" className="text-black hover:text-gray-900">
              Brands
            </Link>
            <Link to="/products" className="text-black hover:text-gray-900">
              Products
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Wishlist Icon */}
            {auth.token && (
              <Link to="/wishlist" className="relative">
                <Heart className="h-6 w-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            )}

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <User className="h-6 w-6" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  {!auth.token ? (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <span className="block px-4 py-2 text-blue-600">
                        {auth.user?.name}
                      </span>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                        }}
                      >
                        Logout
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 bg-white shadow-lg rounded-lg">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/brands"
              className="block px-4 py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Brands
            </Link>
            <Link
              to="/products"
              className="block px-4 py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};