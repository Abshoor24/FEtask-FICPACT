"use client";

import React from "react";
import QuestButton from "../Button";

export default function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur bg-white/80 border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-[#7C3BED] flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="font-semibold text-lg">TaskQuest</span>
          </div>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <button onClick={() => scrollTo("fitur")} className="hover:text-[#7C3BED] transition">
              Fitur
            </button>
            <button onClick={() => scrollTo("mana")} className="hover:text-[#7C3BED] transition">
              Mana
            </button>
            <button onClick={() => scrollTo("peringkat")} className="hover:text-[#7C3BED] transition">
              Papan Peringkat
            </button>
            <button onClick={() => scrollTo("komunitas")} className="hover:text-[#7C3BED] transition">
              Komunitas
            </button>
          </nav>

          {/* CTA */}
          <QuestButton
          label="Mulai Quest"
          className="text-sm font-medium px-5 py-2" 
          onClick={() => ("/")}
          />
        </div>
      </div>
    </header>
  );
};

