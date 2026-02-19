"use client";

import React from "react";

export default function Sec3() {
  return (
    <section
      id="ai-sage"
      className="w-full bg-[#F7FAF8] py-24 overflow-hidden min-h-screen" 
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT – AI CARD */}
          <div className="relative">
            {/* Glow background */}
            <div className="absolute -inset-6 bg-linear-to-br from-green-200/60 to-transparent blur-3xl rounded-full" />

            <div className="relative bg-white rounded-3xl shadow-2xl p-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center text-white text-xl shadow">
                  🧠
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">AI Sage Insight</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Penasihat Akademik
                  </p>
                </div>
              </div>

              {/* Insight bubble */}
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 mb-4">
                Berdasarkan data minggu lalu, kekuatan fokusmu meningkat
                <span className="text-green-600 font-semibold">
                  {" "}
                  di jam 10:00 pagi
                </span>
                .
              </div>

              {/* Recommendation bubble */}
              <div className="bg-green-100 border border-green-300 rounded-xl p-4 text-sm text-green-800 mb-8">
                Selesaikan <strong>{"Boss Task"}</strong> Kalkulus sekarang
                untuk mendapatkan <strong>+50 XP Bonus Kecepatan!</strong>
              </div>

              {/* Progress indicator */}
              <div className="flex gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-green-400" />
                <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
                <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>

          {/* RIGHT – TEXT CONTENT */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Nasihat Sang Bijak{" "}
              <span className="text-[#7C3BED]">AI</span>
            </h2>

            <p className="text-gray-600 leading-relaxed max-w-xl">
              Jangan menebak-nebak waktu belajarmu. AI Sage menganalisis
              pola produktivitasmu dan memberikan strategi bertarung yang
              tepat untuk menaklukkan ujian.
            </p>

            {/* Feature list */}
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-green-400 text-white flex items-center justify-center text-sm">
                  ✓
                </span>
                <span className="font-medium text-gray-800">
                  Analisis Waktu Produktif
                </span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-green-400 text-white flex items-center justify-center text-sm">
                  ✓
                </span>
                <span className="font-medium text-gray-800">
                  Rekomendasi Istirahat (MP Recovery)
                </span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-green-400 text-white flex items-center justify-center text-sm">
                  ✓
                </span>
                <span className="font-medium text-gray-800">
                  Prediksi Burn-out
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
