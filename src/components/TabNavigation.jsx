import { useState } from "react";

function TabNavigation() {
  // State to keep track of the search input value
  const [search, setSearch] = useState("");

  return (
    // Navigation bar container with background and text colors, padding, shadow, flex layout
    <nav className="bg-zinc-950 text-zinc-50 shadow px-6 py-6 flex items-center justify-between">
      
      {/* Menu tabs, hidden on small screens and visible on medium+ screens */}
      <ul className="hidden md:flex gap-[0px] font-sm">
        {/* Each tab is a list item with hover effects for background and border */}
        <li className="border-2 border-transparent hover:bg-zinc-800 hover:border-zinc-700 hover:rounded-sm cursor-pointer px-5 py-2 transition-all duration-200 cursor-pointer">
          Charging Stations
        </li>
        <li className="border-2 border-transparent hover:bg-zinc-800 hover:border-zinc-700 hover:rounded-sm cursor-pointer px-5 py-2 transition-all duration-200 cursor-pointer">
          Fleet Sizing
        </li>
        <li className="border-2 border-transparent hover:bg-zinc-800 hover:border-zinc-700 hover:rounded-sm cursor-pointer px-5 py-2 transition-all duration-200 cursor-pointer">
          Parking
        </li>
      </ul>

      {/* Search input container with relative positioning for icon placement */}
      <div className="relative w-48 md:w-64">
        {/* Search input field with styling and controlled value */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state on input change
          placeholder="Search..."
          className="bg-zinc-900 w-full border border-zinc-50 rounded-sm border-2 border-zinc-700 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 placeholder:text-zinc-50 placeholder:bold"
        />
        {/* Search icon SVG positioned absolutely inside the input */}
        <svg
          className="w-4 h-4 absolute left-3 top-2.5 text-zinc-50"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>
    </nav>
  );
}

export default TabNavigation;
