import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto px-4">
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Us Section */}
          <div className="md:col-span-1">
            <h3 className="text-lg text-center font-bold mb-4">Contact Us</h3>
            <form className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="py-3 px-3 bg-gray-800 text-white rounded w-full outline-none border-none"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="py-3 px-3 bg-gray-800 text-white rounded w-full outline-none border-none"
                />
                <input 
                  type="tel" 
                  placeholder="Phone No" 
                  className="py-3 px-3 bg-gray-800 text-white rounded w-full outline-none border-none"
                />
              </div>
              <textarea 
                placeholder="Message" 
                rows="2" 
                className="w-full p-3 bg-gray-800 text-white rounded outline-none border-none"
              ></textarea>
              <div className="flex justify-start">
                <button className="bg-gray-700 text-white py-2 px-5 rounded text-sm">Send</button>
              </div>
            </form>
          </div>
          
          {/* About Us Section */}
          <div className="md:col-span-1">
            <h3 className="text-lg text-center font-bold mb-4">About Us</h3>
            <p className="text-sm text-center text-justify text-gray-400">
            Welcome to Price Drop, your go-to platform for discovering the best deals on branded clothing! We bring you the latest sales, discounts, and limited-time offers from top fashion brands, ensuring you never miss out on a great bargain. Whether you're looking for casual wear, formal attire, or trendy outfits, we make shopping more affordable and exciting.

At Price Drop, we constantly update our platform with the newest deals, helping you stay ahead of seasonal sales and exclusive brand promotions. Our goal is to provide a seamless shopping experience with curated offers that match your style and budget. With a user-friendly interface and up-to-date fashion insights, we make it easier than ever to shop smartly and save big. Explore our platform today and discover unbeatable discounts on your favorite brands!
            </p>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 pt-3 flex flex-col md:flex-row text-sm mt-4">
          <p className="text-gray-400 text-center">© 2025 Price Drop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
