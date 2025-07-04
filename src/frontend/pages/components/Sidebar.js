import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ onLinkClick }) {
  return (
    <div className="p-4 text-blue-500">
      <nav className="flex flex-col space-y-2">
        <Link
          to="/home"
          onClick={onLinkClick}
          className="border border-blue-500 p-2 rounded-lg hover:bg-blue-500 hover:text-white"
        >
          Home
        </Link>
        <Link
          to="/quotes"
          onClick={onLinkClick}
          className="border border-blue-500 p-2 rounded-lg hover:bg-blue-500 hover:text-white"
        >
          Quotes
        </Link>
        <Link
          to="/videos"
          onClick={onLinkClick}
          className="border border-blue-500 p-2 rounded-lg hover:bg-blue-500 hover:text-white"
        >
          Videos
        </Link>
      </nav>
    </div>
  );
}
