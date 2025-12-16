import React from "react";
import Image from "next/image";
import logoPic from "@/public/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* Logo Image */}
      <div className="relative w-20 h-20">
  <Image
    src={logoPic}
    alt="Notes Logo"
    fill
    style={{ objectFit: "contain" }} // preserves aspect ratio
    priority
  />
</div>


      {/* Text */}
      <div>
        <h1 className="text-xl font-bold text-(--primary-color)">NoteNest</h1>
        <p className="text-sm text-(--subtext-color)">
          Organize your thoughts, anytime, anywhere.
        </p>
      </div>
    </div>
  );
};

export default Logo;
