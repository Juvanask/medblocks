// src/components/Header.js
import React from "react";
import { Heart } from "lucide-react";
import Navigation from "../Navigation/Navigation"; // Assuming Navigation is also moved to its own file

const Header = () => (
  <header className="backdrop-blur-md bg-white/10 border-b border-[#BAD6EB]/30 shadow-sm sticky top-0 z-50">
    <div className="container mx-auto px-6 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart size={24} className="text-[#334EAC]" />
          <div>
            <h1 className="text-2xl font-semibold text-[#081F5C]">
              Medblocks
            </h1>
          </div>
        </div>
        <Navigation />
      </div>
    </div>
  </header>
);

export default Header;
