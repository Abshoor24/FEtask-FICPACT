"use client";

import { Bell, Search, Star } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-[72px] bg-[#F3F4F6] border-b flex items-center justify-between px-6 md:px-10">
      
      {/* SEARCH */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Cari medali legendaris..."
          className="w-full h-11 pl-10 pr-4 rounded-full bg-white border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#7C3BED]/30"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3 md:gap-4 ml-6">
        
        {/* Notification */}
        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50">
          <Bell size={18} className="text-gray-600" />
        </div>

        {/* XP */}
        <div className="hidden sm:flex items-center gap-2 px-4 h-10 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700">
          <Star size={16} className="text-[#7C3BED]" />
          XP Total: 12,450
        </div>
      </div>
    </header>
  );
}