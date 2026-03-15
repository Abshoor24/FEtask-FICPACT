"use client";

import { Search, CalendarDays, Sunrise, Clock, CheckCircle2 } from "lucide-react";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";

import TodayTaskItem from "./TodayTaskItem";
import TodayEmptyState from "./TodayEmptyState";
import AddTaskButton from "@/components/AddTaskBtn";
import AddTaskDrawer from "@/components/AddTaskDrawer";
import VoiceCommand from "@/components/VoiceCommand/index";
import {
  useGetUserQuests,
  useUpdateCompletedQuest,
} from "@/data/hooks/useQuest";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProfile } from "@/data/hooks/useAuth";

export default function TodayContent() {
  const [open, setOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const queryInvalidate = useQueryClient();

  const { data } = useGetUserQuests();
  const { data: session } = useGetProfile();
  const { mutate: updateCompletedQuest } = useUpdateCompletedQuest();

  // Filter only TODAY quests
  const todayQuests = data?.data?.find((d) => d.key === "TODAY");
  const allTodayQuests = todayQuests?.quests ?? [];

  // Search filter
  const filteredQuests = useMemo(() => {
    if (!searchQuery.trim()) return allTodayQuests;
    return allTodayQuests.filter((q) =>
      q.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allTodayQuests, searchQuery]);

  // Stats
  const totalQuests = allTodayQuests.length;
  const completedQuests = allTodayQuests.filter(
    (q) => q.status === "COMPLETED"
  ).length;
  const failedQuests = allTodayQuests.filter(
    (q) => q.status === "FAILED"
  ).length;
  const pendingQuests = totalQuests - completedQuests - failedQuests;
  const percent = totalQuests
    ? Math.round((completedQuests / totalQuests) * 100)
    : 0;

  const handleClick = (questId: string) => {
    updateCompletedQuest(questId, {
      onSuccess: () => {
        queryInvalidate.invalidateQueries({ queryKey: ["get_user_quests"] });
      },
    });
  };

  // Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 17) return "Selamat Siang";
    return "Selamat Malam";
  };

  const todayDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
              <Sunrise className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium text-amber-500">
                {getGreeting()}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Today&apos;s Quests
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <CalendarDays className="w-3.5 h-3.5 text-gray-400" />
              <p className="text-sm text-gray-400">{todayDate}</p>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            {/* SEARCH */}
            <div className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-500 shadow-sm focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
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
            <p className="text-xs text-green-400 mt-1">quest completed</p>
          </motion.div>

          {/* Pending Card */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-sm font-medium text-purple-600">
                Tersisa
              </span>
            </div>
            <p className="text-3xl font-bold text-purple-700">
              {pendingQuests}
            </p>
            <p className="text-xs text-purple-400 mt-1">quest remaining</p>
          </motion.div>

          {/* Progress Card */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                <Sunrise className="w-5 h-5 text-amber-500" />
              </div>
              <span className="text-sm font-medium text-amber-600">
                Progress
              </span>
            </div>
            <p className="text-3xl font-bold text-amber-700">{percent}%</p>
            <p className="text-xs text-amber-400 mt-1">daily completion</p>
          </motion.div>
        </motion.div>

        {/* ================= PROGRESS BAR ================= */}
        <motion.div
          className="mb-8 rounded-2xl bg-white p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">
              🎯 Daily Quest Progress
            </p>
            <span className="text-sm font-bold text-[#7C3BED]">
              {percent}%
            </span>
          </div>

          <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#7C3BED] to-[#9B5BFF]"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            />
          </div>

          <div className="mt-3 flex justify-between text-sm">
            <p className="text-gray-400">
              {completedQuests} dari {totalQuests} quest selesai
            </p>
            <div className="flex gap-4">
              <span className="font-semibold text-green-500 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                {completedQuests} Done
              </span>
              <span className="font-semibold text-purple-500 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                {pendingQuests} Left
              </span>
              {failedQuests > 0 && (
                <span className="font-semibold text-red-500 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  {failedQuests} Failed
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* ================= QUICK ADD ================= */}
        <motion.div
          onClick={() => setOpen(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.005 }}
          className="mb-6 cursor-pointer rounded-2xl border-2 border-dashed border-gray-200 bg-white/60 p-4 text-sm text-gray-400 transition-all hover:border-[#7C3BED] hover:text-[#7C3BED] hover:bg-purple-50/30 hover:shadow-sm"
        >
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-500 flex items-center justify-center text-xs font-bold">
              +
            </span>
            Tambah quest baru untuk hari ini...
          </span>
        </motion.div>

        {/* ================= TASK LIST ================= */}
        {totalQuests === 0 ? (
          <TodayEmptyState onAdd={() => setOpen(true)} />
        ) : filteredQuests.length === 0 ? (
          <motion.div
            className="flex flex-col items-center py-16 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Search className="w-10 h-10 text-gray-200" />
            <p className="text-gray-400 text-sm">
              Tidak ada quest yang cocok dengan &quot;{searchQuery}&quot;
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Today&apos;s Quest List
              </p>
              <span className="text-xs text-gray-300">
                {filteredQuests.length} quest
                {filteredQuests.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Quests */}
            {filteredQuests.map((quest) => (
              <TodayTaskItem
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
                completed={quest.status === "COMPLETED"}
                failed={quest.status === "FAILED"}
              />
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
