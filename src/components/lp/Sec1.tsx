"use client";

import React from "react";
import QuestButton from "../Button";

export default function Sec1() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full bg-[#F7FAF8] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Ubah Tugas Jadi
              <span className="block text-[#7C3BED]">
                Petualangan Epik
              </span>
            </h1>

            <p className="max-w-xl text-gray-600 leading-relaxed">
              Selesaikan quest harian, naikkan level IPK-mu, dan jadilah legenda
              kampus. Platform produktivitas seperti RPG favoritmu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <QuestButton
                label="▶ Mulai Quest Kamu"
                className="text-sm font-semibold px-10 py-4"
                onClick={() => {}}
              />

              <button className="px-10 py-4 rounded-full border border-gray-300 font-semibold text-gray-700 transition hover:border-[#7C3BED] hover:text-[#7C3BED]">
                👥 Lihat Guild
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md md:max-w-lg bg-white rounded-3xl p-8 shadow-2xl">
              <div className="relative bg-green-50 rounded-2xl p-6 h-64 flex flex-col justify-center">
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-5 py-2 rounded-full shadow text-sm font-semibold">
                  ⭐ LEVEL UP! 14
                </div>

                <div className="mt-20">
                  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full w-[85%] bg-[#7C3BED] rounded-full" />
                  </div>
                  <p className="mt-2 text-xs text-gray-500 text-center">
                    850 / 1000 XP untuk Level 15
                  </p>
                </div>

                <div className="absolute inset-0 rounded-2xl border-2 border-green-100 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
