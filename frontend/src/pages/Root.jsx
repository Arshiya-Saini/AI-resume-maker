import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

function Root() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    
    // Simulate API call
    toast.success("Successfully subscribed to our newsletter!");
    setEmail("");
  };
  return (
    <div className="flex flex-col min-h-screen bg-[#030712] text-slate-200">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white mt-auto border-t border-blue-800">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 text-center md:text-left">
            {/* Brand Section */}
            <div className="lg:col-span-4 flex flex-col items-center md:items-start space-y-6">
              <h4 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300">
                AI Resume Maker
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Empowering job seekers with cutting-edge AI technology to create stunning, professional resumes in seconds.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-blue-800/30 rounded-full hover:bg-blue-400 transition-all duration-300 hover:-translate-y-1"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-blue-800/30 rounded-full hover:bg-pink-500 transition-all duration-300 hover:-translate-y-1"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-blue-800/30 rounded-full hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-blue-800/30 rounded-full hover:bg-gray-700 transition-all duration-300 hover:-translate-y-1"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 flex flex-col items-center md:items-start">
              <h4 className="text-lg font-semibold mb-6 text-blue-300">Company</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="/about" className="hover:text-blue-400 transition-colors duration-300">About Us</a></li>
                <li><a href="/services" className="hover:text-blue-400 transition-colors duration-300">Services</a></li>
                <li><a href="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact</a></li>
              </ul>
            </div>

            {/* Support Section */}
            <div className="lg:col-span-2 flex flex-col items-center md:items-start">
              <h4 className="text-lg font-semibold mb-6 text-blue-300">Support</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Help Center</a></li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="lg:col-span-4 flex flex-col items-center md:items-start space-y-6">
              <h4 className="text-lg font-semibold text-blue-300">Stay Updated</h4>
              <p className="text-sm text-gray-400 max-w-xs">Join our newsletter for latest tips & tricks.</p>
              <form onSubmit={handleSubscribe} className="w-full max-w-xs space-y-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email" 
                  className="w-full px-4 py-3 bg-slate-800/50 border border-blue-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                />
                <button 
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl transition-all duration-300 text-sm font-semibold shadow-lg shadow-blue-900/20"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-blue-800/30 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs tracking-wider">
            <p>&copy; 2026 AI Resume Maker. All rights reserved.</p>
            <p className="mt-4 md:mt-0 opacity-75">Built with ❤️ for better careers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Root;
