"use client";

import React from "react";
import QuestButton from "../Button";
import Link from "next/link";

export default function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-3 z-50 flex justify-center">
      {/* GLASS CONTAINER */}
      <div className="w-[95%] max-w-6xl rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
        <div className="px-6 py-1">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() => scrollTo("home")}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7C3BED] font-bold text-white">
                T
              </div>
              <span className="text-lg font-semibold text-black">
                TaskQuest
              </span>
            </div>

            {/* Menu */}
            <nav className="hidden items-center gap-8 text-sm font-medium text-green-700 md:flex">
              <button
                onClick={() => scrollTo("fitur")}
                className="transition hover:text-[#7C3BED] cursor-pointer"
              >
                Fitur
              </button>
              <button
                onClick={() => scrollTo("ai-sage")}
                className="transition hover:text-[#7C3BED] cursor-pointer"
              >
                AI
              </button>
              <button
                onClick={() => scrollTo("focus")}
                className="transition hover:text-[#7C3BED] cursor-pointer"
              >
                Focus
              </button>
              <button
                onClick={() => scrollTo("join-us")}
                className="transition hover:text-[#7C3BED] cursor-pointer"
              >
                Join Us
              </button>
            </nav>

            <Link href={"/auth/login"}>
              <QuestButton
              label="Mulai Quest"
              className="px-5 py-2 text-sm font-medium"
              onClick={() => "/"}
            />
            </Link>
            
          </div>
        </div>
      </div>
    </header>
  );
}
