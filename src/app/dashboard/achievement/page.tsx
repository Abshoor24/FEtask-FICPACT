"use client";

import React from "react";
import {
  Sparkles,
  Flame,
  Lock,
  Users,
  Shield,
  Trophy,
  Star,
} from "lucide-react";

import Header from "@/components/Header";

interface Achievement {
  title: string;
  description: string;
  progress?: string;
  xp: string;
  status: "completed" | "claim" | "progress" | "locked";
  icon: React.ElementType;
}

export default function AchievmentPage() {
  const achievements: Achievement[] = [
    {
      title: "Penakluk Fajar",
      description: "Selesaikan 10 tugas sebelum pukul 08:00 pagi.",
      progress: "Lengkap",
      xp: "+500 XP",
      status: "claim",
      icon: Star,
    },
    {
      title: "Ahli Strategi",
      description: "Membuat kategori tugas kustom pertama Anda.",
      progress: "Terbuka",
      xp: "+200 XP",
      status: "completed",
      icon: Sparkles,
    },
    {
      title: "Api Abadi",
      description: "Pertahankan streak penyelesaian 30 hari.",
      progress: "21/30 HARI",
      xp: "+1000 XP",
      status: "progress",
      icon: Flame,
    },
    {
      title: "Legenda Guardian",
      description: "Capai Level 100 dan selesaikan 1000 misi.",
      progress: "Terkunci",
      xp: "+5000 XP",
      status: "locked",
      icon: Lock,
    },
    {
      title: "Sage Tak Terbatas",
      description: "Bantu 50 ksatria baru dalam komunitas.",
      progress: "20/50 REKAN",
      xp: "+2500 XP",
      status: "progress",
      icon: Users,
    },
    {
      title: "Emas Pertama",
      description: "Kumpulkan 1,000 koin emas dari misi harian.",
      progress: "Tercapai",
      xp: "+750 XP",
      status: "claim",
      icon: Trophy,
    },
    {
      title: "Benteng Kokoh",
      description: "Selesaikan 50 tugas prioritas tinggi.",
      progress: "7/50 TUGAS",
      xp: "+1200 XP",
      status: "locked",
      icon: Shield,
    },
    {
      title: "Rekan Seperjuangan",
      description: "Undang 5 teman untuk bergabung.",
      progress: "Selesai",
      xp: "+400 XP",
      status: "completed",
      icon: Users,
    },
  ];

  return (
    <div className="flex flex-col h-screen w-full">
      
      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <main className="flex-1 bg-[#F6F7FB] overflow-y-auto px-6 md:px-10 py-8">

        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Galeri Pencapaian
          </h1>
          <p className="text-gray-500 mt-2">
            Kumpulkan medali dari misi yang diselesaikan untuk membuktikan reputasimu.
          </p>
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="px-4 py-2 text-sm rounded-full bg-[#7C3BED] text-white">
            Semua
          </button>
          <button className="px-4 py-2 text-sm rounded-full bg-white border text-gray-600">
            Siap Klaim
          </button>
          <button className="px-4 py-2 text-sm rounded-full bg-white border text-gray-600">
            Terbuka
          </button>
          <button className="px-4 py-2 text-sm rounded-full bg-white border text-gray-600">
            Terkunci
          </button>
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {achievements.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition"
              >
                {/* ICON */}
                <div className="w-12 h-12 rounded-full bg-[#7C3BED]/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#7C3BED]" />
                </div>

                {/* TITLE */}
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>
                </div>

                {/* PROGRESS */}
                <div className="mt-5">
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-[#7C3BED] rounded-full w-2/3"></div>
                  </div>

                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>{item.progress}</span>
                    <span>{item.xp}</span>
                  </div>
                </div>

                {/* BUTTON */}
                <div className="mt-4">
                  {item.status === "claim" && (
                    <button className="w-full py-2 rounded-lg bg-[#7C3BED] text-white text-sm font-medium hover:bg-[#6d33d6]">
                      Klaim Hadiah
                    </button>
                  )}

                  {item.status === "completed" && (
                    <button className="w-full py-2 rounded-lg bg-gray-100 text-gray-500 text-sm">
                      Sudah Diambil
                    </button>
                  )}

                  {item.status === "progress" && (
                    <button className="w-full py-2 rounded-lg bg-gray-100 text-gray-600 text-sm">
                      Sedang Berjalan
                    </button>
                  )}

                  {item.status === "locked" && (
                    <button className="w-full py-2 rounded-lg bg-gray-100 text-gray-400 text-sm">
                      Belum Terpenuhi
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}