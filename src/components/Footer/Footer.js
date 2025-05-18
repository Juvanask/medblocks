// src/components/Footer.js
import React from "react";

const Footer = () => (
  <footer className="py-6 mt-12 border-t border-[#BAD6EB]/20">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-[#081F5C] text-sm font-medium">
          Medblocks
        </p>
        <p className="text-[#7096D1] text-xs">
          © 2025 medblocks. All rights reserved. Made by juvana
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
