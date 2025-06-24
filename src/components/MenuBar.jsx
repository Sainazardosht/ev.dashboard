import React from "react";
import { FiSettings, FiClock, FiMenu } from "react-icons/fi";
import { PiClipboardTextFill } from "react-icons/pi";
import { TiHome } from "react-icons/ti";
import { MdCloudUpload } from "react-icons/md";
import { BsBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const MenuBar = () => {
  return (
    // Sidebar container with fixed width, vertical flex layout,
    // background color, text color, padding, and shadow
    <div className="flex flex-col justify-between w-20 bg-zinc-950 text-zinc-500 items-center p-6 shadow-md">
      <div>
        {/* Sidebar icons group (top part) */}
        <SidebarIcon icon={<FiMenu />} label="Menu" />
        <SidebarIcon icon={<TiHome />} label="Home" />
        <SidebarIcon icon={<BsBellFill />} label="Bell" />
        {/* Custom icon with overlayed clock */}
        <SidebarIcon
          icon={<ClipboardWithClockIcon />}
          label="ClipboardWithClockIcon"
        />
        <SidebarIcon icon={<MdCloudUpload />} label="CloudUpload" />
        <SidebarIcon icon={<FiSettings />} label="Settings" />
      </div>
      <div>
        {/* Sidebar icon for user/profile with custom text color */}
        <SidebarIcon
          icon={<FaUserCircle />}
          label="User"
          customClass="text-zinc-50"
        />
      </div>
    </div>
  );
};

// Custom icon combining clipboard and clock icons with positioning
function ClipboardWithClockIcon() {
  return (
    <div className="relative text-zinc-500 hover:text-zinc-50">
      {/* Base clipboard icon */}
      <PiClipboardTextFill className="w-full h-full" />
      {/* Clock icon positioned at bottom-right with background and hover color change */}
      <FiClock className="absolute bottom-0 right-0 w-3 h-3 text-zinc-500 bg-zinc-950 rounded-full p-[1px] hover:text-zinc-50" />
    </div>
  );
}

// Reusable SidebarIcon component for consistent styling and hover effects
const SidebarIcon = ({ icon, customClass = "" }) => {
  return (
    <div
      className={`group relative flex items-center justify-center h-10 w-10 text-lg ${customClass} rounded-lg m-1 
      hover:bg-zinc-800 hover:text-zinc-50 hover:border hover:border-zinc-700 
      transition-all duration-200 cursor-pointer`}
      title={icon.label}
    >
      {icon}
    </div>
  );
};

export default MenuBar;
