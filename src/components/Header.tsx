"use client";

import { Search } from "lucide-react";

interface HeaderProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export default function Header({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Cari medali legendaris...",
}: HeaderProps) {
  return (
    <header className="w-full h-18 bg-[#F3F4F6] border-b flex items-center px-6 md:px-10">
      
      {/* SEARCH */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full h-11 pl-10 pr-4 rounded-full bg-white border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#7C3BED]/30"
          value={searchValue}
          onChange={onSearchChange ? (e) => onSearchChange(e.target.value) : undefined}
        />
      </div>
    </header>
  );
}