"use client";

import {
  Search,
  CalendarRange,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Filter,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";

import UpcomingTaskItem from "./UpcomingTaskItem";
import UpcomingEmptyState from "./UpcomingEmptyState";
import UpcomingSection from "./UpcomingSection";
import AddTaskButton from "@/components/AddTaskBtn";
import AddTaskDrawer from "@/components/AddTaskDrawer";
import VoiceCommand from "@/components/VoiceCommand/index";
import {
  useGetUserQuests,
  useUpdateCompletedQuest,
} from "@/data/hooks/useQuest";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProfile } from "@/data/hooks/useAuth";

type FilterType = "ALL" | "ONGOING" | "COMPLETED" | "FAILED";

export default function UpcomingContent() {
  const [open, setOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const queryInvalidate = useQueryClient();

  const { data: session } = useGetProfile();
  const { data } = useGetUserQuests();
  const { mutate: updateCompletedQuest } = useUpdateCompletedQuest();

  // Filter out TODAY quests — show everything else as "upcoming"
  const upcomingSections = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((d) => d.key !== "TODAY");
  }, [data]);

  // Stats across all upcoming
  const allUpcomingQuests = useMemo(
    () => upcomingSections.flatMap((s) => s.quests),
    [upcomingSections]
  );

  const totalQuests = allUpcomingQuests.length;
  const completedQuests = allUpcomingQuests.filter(
    (q) => q.status === "COMPLETED"
  ).length;
  const failedQuests = allUpcomingQuests.filter(
    (q) => q.status === "FAILED"
  ).length;
  const pendingQuests = totalQuests - completedQuests - failedQuests;

  // Filtered sections
  const filteredSections = useMemo(() => {
    return upcomingSections
      .map((section) => {
        let quests = section.quests;

        // Status filter
        if (activeFilter !== "ALL") {
          quests = quests.filter((q) => q.status === activeFilter);
        }

        // Search filter
        if (searchQuery.trim()) {
          quests = quests.filter((q) =>
            q.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        return { ...section, quests };
      })
      .filter((s) => s.quests.length > 0);
  }, [upcomingSections, activeFilter, searchQuery]);

  const handleClick = (questId: string) => {
    updateCompletedQuest(questId, {
      onSuccess: () => {
        queryInvalidate.invalidateQueries({ queryKey: ["get_user_quests"] });
      },
    });
  };

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: "ALL", label: "Semua", count: totalQuests },
    { key: "ONGOING", label: "Ongoing", count: pendingQuests },
    { key: "COMPLETED", label: "Selesai", count: completedQuests },
    { key: "FAILED", label: "Gagal", count: failedQuests },
  ];

  return (
    <>
      <div className="h-full overflow-y-auto px-10 py-8">
        {/* ================= HEADER ================= */}
        <motion.div
          className="flex items-center justify-between mb-8"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* LEFT */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-2 mb-1">
              <CalendarRange className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-500">
                Jadwal Mendatang
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Upcoming Quests
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {totalQuests} quest tersisa di jadwal mendatang
            </p>
          </motion.div>

          {/* RIGHT */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            {/* SEARCH */}
            <div className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-500 shadow-sm focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Search size={16} className="text-gray-400" />
              <input
                placeholder="Cari quest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-40 placeholder:text-gray-300"
              />
            </div>

            {/* ADD TASK BUTTON + VOICE BUTTON */}
            <AddTaskButton
              onClick={() => setOpen(true)}
              onVoiceClick={() => setVoiceOpen(true)}
            />
          </motion.div>
        </motion.div>

        {/* ================= STATS CARDS ================= */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Pending Card */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm font-medium text-blue-600">
                Menunggu
              </span>
            </div>
            <p className="text-3xl font-bold text-blue-700">{pendingQuests}</p>
            <p className="text-xs text-blue-400 mt-1">quest menunggu</p>
          </motion.div>

          {/* Completed Card */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-sm font-medium text-green-600">
                Selesai
              </span>
            </div>
            <p className="text-3xl font-bold text-green-700">
              {completedQuests}
            </p>
            <p className="text-xs text-green-400 mt-1">quest selesai</p>
          </motion.div>

          {/* Failed Card */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-sm font-medium text-red-600">Gagal</span>
            </div>
            <p className="text-3xl font-bold text-red-700">{failedQuests}</p>
            <p className="text-xs text-red-400 mt-1">quest gagal</p>
          </motion.div>
        </motion.div>

        {/* ================= FILTER TABS ================= */}
        <motion.div
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Filter size={14} className="text-gray-300 mr-1" />
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeFilter === f.key
                ? "bg-[#7C3BED] text-white shadow-sm shadow-purple-200"
                : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                }`}
            >
              {f.label}
              <span
                className={`ml-1.5 ${activeFilter === f.key ? "text-purple-200" : "text-gray-300"
                  }`}
              >
                {f.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ================= QUICK ADD ================= */}
        <motion.div
          onClick={() => setOpen(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.005 }}
          className="mb-6 cursor-pointer rounded-2xl border-2 border-dashed border-gray-200 bg-white/60 p-4 text-sm text-gray-400 transition-all hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 hover:shadow-sm"
        >
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-500 flex items-center justify-center text-xs font-bold">
              +
            </span>
            Tambah quest untuk jadwal mendatang...
          </span>
        </motion.div>

        {/* ================= TASK LIST ================= */}
        {totalQuests === 0 ? (
          <UpcomingEmptyState onAdd={() => setOpen(true)} />
        ) : filteredSections.length === 0 ? (
          <motion.div
            className="flex flex-col items-center py-16 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Search className="w-10 h-10 text-gray-200" />
            <p className="text-gray-400 text-sm">
              {searchQuery
                ? `Tidak ada quest yang cocok dengan "${searchQuery}"`
                : "Tidak ada quest dengan status ini"}
            </p>
          </motion.div>
        ) : (
          <motion.div variants={stagger} initial="hidden" animate="show">
            {filteredSections.map((section) => (
              <UpcomingSection
                key={section.key}
                sectionKey={section.key}
                count={section.quests.length}
              >
                {section.quests.map((quest) => (
                  <UpcomingTaskItem
                    key={quest.id}
                    onClick={() => {
                      if (
                        quest.status === "COMPLETED" ||
                        quest.status === "FAILED"
                      )
                        return;
                      handleClick(quest.id);
                    }}
                    title={quest.name}
                    tag={quest.status}
                    priority="Medium"
                    deadline={quest.deadLineAt}
                    completed={quest.status === "COMPLETED"}
                    failed={quest.status === "FAILED"}
                  />
                ))}
              </UpcomingSection>
            ))}
          </motion.div>
        )}
      </div>

      {/* ================= DRAWERS & MODALS ================= */}
      <AddTaskDrawer open={open} onClose={() => setOpen(false)} />
      <VoiceCommand open={voiceOpen} onClose={() => setVoiceOpen(false)} locked={session?.data.level! < 2} />
    </>
  );
}
