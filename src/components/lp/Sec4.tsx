"use client";

import React from "react";

export default function Sec4() {
  return (
    <section className="w-full bg-white py-20" id="fitur">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* LEFT – STREAK VISUAL */}
          <div className="relative flex justify-center items-center scale-90 md:scale-100">
            {/* Glow Ring BESAR */}
            <div className="absolute h-105 w-105 rounded-full bg-green-100 opacity-40" />

            {/* Glow Ring KECIL */}
            <div className="absolute h-80 w-[320px] rounded-full bg-green-200 opacity-40" />

            {/* Main Circle (ANCHOR) */}
            <div className="relative z-10 flex h-64 w-64 flex-col items-center justify-center rounded-full bg-green-400 text-center shadow-xl">
              <div className="mb-2 text-2xl">☀️</div>
              <h3 className="text-5xl font-extrabold text-black">14</h3>
              <p className="text-sm font-semibold tracking-wide text-black">
                DAY STREAK
              </p>
            </div>

            {/* Level Badge */}
            <div className="absolute top-10 right-10 z-20 rounded-xl bg-white px-4 py-2 text-xs font-medium shadow">
              🌱 Level 4 Garden
            </div>

            {/* Toast */}
            <div className="absolute -bottom-12 left-1/2 z-20 w-64 -translate-x-1/2 rounded-xl bg-white px-4 py-3 text-xs shadow-lg">
              <p className="mb-1 font-semibold">TaskQuest</p>
              <p className="text-gray-500">
                “Hey Alex! Your morning focus window is starting soon.”
              </p>
            </div>
          </div>

          {/* RIGHT – CONTENT */}
          <div>
            <h2 className="mb-6 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Grow Your Mastery,
              <br />
              Stay Consistent.
            </h2>

            <p className="mb-10 max-w-xl text-gray-600">
              Visualizing progress is key to student success. Watch your virtual
              garden flourish as you maintain your streaks.
            </p>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                  ☀️
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Sun Streak Visualizer
                  </h4>
                  <p className="text-sm text-gray-600">
                    Every task completed adds a ray of sunshine. Reach the 7-day
                    “Golden Hour” for bonus rewards.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  💬
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Smart WhatsApp Reminders
                  </h4>
                  <p className="text-sm text-gray-600">
                    Friendly reminders where you already hang out — no annoying
                    push notifications.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  📁
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Skill-Based Folders
                  </h4>
                  <p className="text-sm text-gray-600">
                    Every folder is a mastery path. Complete tasks to level up
                    your garden.
                  </p>
                </div>
              </div>
            </div>

            {/* Folder Cards */}
            <div className="mt-12 flex flex-wrap gap-4">
              <div className="w-40 rounded-xl border-2 border-green-400 p-4">
                <span className="text-xs font-semibold text-green-600">
                  🌱 ACTIVE
                </span>
                <p className="mt-2 text-sm font-medium">
                  Mata Kuliah:
                  <br />
                  Struktur Data
                </p>
              </div>

              <div className="w-40 rounded-xl border-2 border-blue-400 p-4">
                <span className="text-xs font-semibold text-blue-600">
                  📘 ACTIVE
                </span>
                <p className="mt-2 text-sm font-medium">
                  Mata Kuliah:
                  <br />
                  Basis Data
                </p>
              </div>

              <div className="w-40 rounded-xl border border-gray-300 p-4 opacity-60">
                <span className="text-xs font-semibold text-gray-400">
                  ⛔ BROKEN
                </span>
                <p className="mt-2 text-sm font-medium">
                  Quest Gagal:
                  <br />
                  Sejarah
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
