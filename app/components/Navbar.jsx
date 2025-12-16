import React from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-(--card-background) shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image src={Logo} alt="Logo" width={40} height={40} />
        <span className="font-bold text-(--primary-color) text-lg">
          NoteNest
        </span>
      </div>

      {/* Navigation Links */}
        <ul className="flex space-x-6 font-medium">
        <Link href="/" className="text-(--text-color) hover:text-(--primary-color) cursor-pointer">Home</Link>
        <Link href="/pages/newNote" className="text-(--text-color) hover:text-(--primary-color) cursor-pointer">New Notes</Link>
        <Link href="/" className="text-(--text-color) hover:text-(--primary-color) cursor-pointer">About</Link>
        <Link href="/" className="text-(--text-color) hover:text-(--primary-color) cursor-pointer">Contact</Link>
        <Link href="/" className="text-(--text-color) hover:text-(--primary-color) cursor-pointer">Feedback</Link>
      </ul>

      {/* Logout Button */}
      {session && (
        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="bg-(--primary-color) text-white px-4 py-1 rounded-md hover:bg-(--secondary-color) transition"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
