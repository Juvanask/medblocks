import React from "react";
import { Plus, Users, Search } from "lucide-react";

// Navigation Item Configuration
const navItems = [
  { id: "register", label: "Register", icon: Plus },
  { id: "patients", label: "Patients", icon: Users },
  { id: "query", label: "Query", icon: Search },
];

// Navigation Item Component
const NavItem = ({ item }) => {
  const IconComponent = item.icon;
  return (
    <li key={item.id}>
      <a
        href={`#${item.id}`}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/40 hover:bg-white/60 border border-[#BAD6EB]/30 transition-all duration-200 text-[#081F5C] hover:text-[#334EAC] font-medium text-sm"
      >
        <IconComponent size={16} />
        {item.label}
      </a>
    </li>
  );
};

// Navigation Component
const Navigation = () => (
  <nav className="mt-4 md:mt-0">
    <ul className="flex flex-wrap gap-4">
      {navItems.map((item) => (
        <NavItem item={item} key={item.id} />
      ))}
    </ul>
  </nav>
);

export default Navigation;
