"use client";

import React from "react";

export default function Footer() {

   const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="w-full bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="w-8 h-8 rounded-lg bg-[#7C3BED] flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="font-semibold text-lg">TaskQuest</span>
          </div>
            <p className="text-sm text-green-700 max-w-xs leading-relaxed">
              Platform produktivitas gamifikasi pertama di Indonesia khusus
              untuk pelajar dan mahasiswa yang ambisius.
            </p>
          </div>

          {/* Navigasi */}
          <div className="space-y-3">
            <h4 className="font-semibold">Navigasi</h4>
            <ul className="space-y-2 text-sm text-green-700">
              <li className="hover:text-[#7C3BED] cursor-pointer">Beranda</li>
              <li className="hover:text-[#7C3BED] cursor-pointer">Cara Kerja</li>
              <li className="hover:text-[#7C3BED] cursor-pointer">Harga Premium</li>
              <li className="hover:text-[#7C3BED] cursor-pointer">Blog Quest</li>
            </ul>
          </div>

          {/* Dukungan */}
          <div className="space-y-3">
            <h4 className="font-semibold">Dukungan</h4>
            <ul className="space-y-2 text-sm text-green-700">
              <li className="hover:text-[#7C3BED] cursor-pointer">Pusat Bantuan</li>
              <li className="hover:text-[#7C3BED] cursor-pointer">Kebijakan Privasi</li>
              <li className="hover:text-[#7C3BED] cursor-pointer">
                Syarat & Ketentuan
              </li>
            </ul>
          </div>

          {/* Media Sosial */}
          <div className="space-y-3">
            <h4 className="font-semibold">Media Sosial</h4>
            <div className="flex gap-4">
              {["🔗", "🌐", "▶️"].map((icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-green-50 text-green-700 flex items-center justify-center cursor-pointer hover:bg-[#7C3BED] hover:text-white transition"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-green-700">
          <span>© 2024 TaskQuest Indonesia. All rights reserved.</span>

          <div className="flex gap-4">
            <button className="hover:text-[#7C3BED] transition">
              Bahasa Indonesia
            </button>
            <button className="hover:text-[#7C3BED] transition">
              English
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
