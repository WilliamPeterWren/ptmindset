import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ onLinkClick }) {
  const location = useLocation();

  const links = [
    // { to: "/home", label: "Home" },
    { to: "/quotes", label: "Quotes" },
    { to: "/mindset", label: "Mindset" },
    { to: "/entertainment", label: "Entertainment" },
    { to: "/study", label: "Study" },
    { to: "/podcast", label: "Podcast" },
    { to: "/work", label: "Work" },
  ];

  return (
    <div className="p-4 text-blue-500">
      <nav className="flex flex-col space-y-2">
        {links.map(({ to, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={onLinkClick}
              className={`border border-blue-500 p-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
