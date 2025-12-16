import React from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
const Footer = () => {
  return (
    <footer className="bg-(--card-background) text-(--subtext-color) py-6 mt-12 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* App Name */}
        {/* Logo + App Name */}
        <div className="flex items-center space-x-2">
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <span className="text-(--primary-color) font-bold text-lg">
            NoteNest
          </span>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          <a href="#home" className="hover:text-(--primary-color) transition">
            Home
          </a>
          <a href="#about" className="hover:text-(--primary-color) transition">
            About
          </a>
          <a
            href="#contact"
            className="hover:text-(--primary-color) transition"
          >
            Contact
          </a>
          <a
            href="#feedback"
            className="hover:text-(--primary-color) transition"
          >
            Feedback
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} NoteNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
