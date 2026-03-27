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
    <header className="w-full h-16 md:h-[72px] shrink-0 bg-[#F3F4F6] border-b flex items-center px-4 pl-16 md:px-10">
      
      {/* SEARCH */}
      <div className="relative w-full flex-1 shrink-0 max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 shrink-0"
        />

        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full min-w-0 h-11 pl-10 pr-4 rounded-full bg-white border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#7C3BED]/30"
          value={searchValue}
          onChange={onSearchChange ? (e) => onSearchChange(e.target.value) : undefined}
        />
      </div>
    </header>
  );
}