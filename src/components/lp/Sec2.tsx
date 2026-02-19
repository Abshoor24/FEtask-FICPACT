"use client";

import React from "react";

export default function Sec2() {
  return (
    <section
      id="power-of-3"
      className="w-full bg-[#F4FBF6] py-20 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            The Power of 3
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Lindungi Mental Mana-mu. Jangan biarkan burn-out menguras MP-mu.
            Pilih hanya 3 quest terpenting setiap hari untuk hasil maksimal.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 - High Priority */}
          <div className="bg-white rounded-2xl p-6 border-2 border-green-400 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                🛡️
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                HIGH PRIORITY
              </span>
            </div>

            <h3 className="font-bold text-lg mb-2">
              Tugas Utama (Boss Task)
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Fokus penuh 100% energi pada tugas dengan bobot nilai paling
              tinggi hari ini.
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span>MENTAL MANA (MP) COST</span>
                <span>50%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full w-1/2 bg-[#7C3BED]" />
              </div>
            </div>
          </div>

          {/* Card 2 - Medium */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                ⚡
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                MEDIUM
              </span>
            </div>

            <h3 className="font-bold text-lg mb-2">
              Penyelesaian Draf
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Selesaikan riset atau kerangka tulisan untuk proyek minggu depan.
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span>MENTAL MANA (MP) COST</span>
                <span>30%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full w-[30%] bg-[#7C3BED]" />
              </div>
            </div>
          </div>

          {/* Card 3 - Daily */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                📘
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                DAILY
              </span>
            </div>

            <h3 className="font-bold text-lg mb-2">
              Review Materi
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Review cepat 20 menit materi kuliah hari ini agar memori tetap
              tajam.
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span>MENTAL MANA (MP) COST</span>
                <span>20%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full w-[20%] bg-[#7C3BED]" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
