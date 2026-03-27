"use client";

import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

import TaskSection from "./TaskSection";
import TaskItem from "./TaskItem";
import AddTaskButton from "@/components/AddTaskBtn";
import AddTaskDrawer from "@/components/AddTaskDrawer";
import VoiceCommand from "@/components/VoiceCommand/index";
import DashboardAlert from "@/components/DashboardAlert";
import QuestReflectionModal from "@/components/QuestReflectionModal";
import {
  useGetUserQuests,
  useUpdateCompletedQuest,
} from "@/data/hooks/useQuest";
import EmptyTask from "./EmptyTask";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProfile } from "@/data/hooks/useAuth";
import { useIsFirstReflection } from "@/data/hooks/useUser";
import toast from "react-hot-toast";

export default function DashboardContent() {
  const [open, setOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [reflectionOpen, setReflectionOpen] = useState(false);
  const [reflectionMode, setReflectionMode] = useState<"success" | "failed">(
    "success",
  );
  const [reflectionQuestId, setReflectionQuestId] = useState<
    string | undefined
  >(undefined);
  const queryInvalidate = useQueryClient();

  const { data: session } = useGetProfile();
  const { data } = useGetUserQuests();
  const { data: isFirstReflection } = useIsFirstReflection();
  const { mutate: updateCompletedQuest } = useUpdateCompletedQuest();

  const hasNoQuests = !data?.data || data.data.length === 0;
  const todayQuests = data?.data.find((d) => d.key === "TODAY");
  const questRemaining = todayQuests?.quests.length ?? 0;
  const successQuests =
    todayQuests?.quests.filter((q) => q.status === "COMPLETED").length ?? 0;

  const percent = questRemaining
    ? Math.round((successQuests / questRemaining) * 100)
    : 0;

  const handleClick = (questId: string) => {
    updateCompletedQuest(questId, {
      onSuccess: () => {
        // refresh quests list
        queryInvalidate.invalidateQueries({ queryKey: ["get_user_quests"] });

        // open reflection modal for this quest (success flow)
        setReflectionMode("success");
        setReflectionQuestId(questId);
        setReflectionOpen(true);
      },
      onError: (err) => {
        toast.error(err.message || "Gagal menambahkan quest baru");
      },
    });
  };

  return (
    <>
      <div className="flex flex-col w-full h-full justify-start overflow-y-auto px-10 py-8 gap-5">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-2">
          {/* LEFT */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
            <p className="text-sm text-gray-500">
              Kamu memiliki {questRemaining} quest tersisa untuk hari ini
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* SEARCH */}
            <div className="flex h-10 items-center gap-2 rounded-lg border bg-white px-3 text-sm text-gray-500">
              <Search size={16} />
              <input
                placeholder="Search tasks..."
                className="bg-transparent outline-none"
              />
            </div>

            {/* ADD TASK BUTTON + VOICE BUTTON */}
            <AddTaskButton
              onClick={() => setOpen(true)}
              onVoiceClick={() => setVoiceOpen(true)}
            />
          </div>
        </div>
        {/* First-reflection alert (shows once after completing first quest) */}
        <DashboardAlert
          isOpen={isFirstReflection?.data.status === true}
          notificationId={isFirstReflection?.data.notificationId || ""}
        />
        {/* ================= PROGRESS ================= */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">
              Daily Completion Goal
            </p>
            <span className="text-sm font-semibold text-[#7C3BED]">
              {percent}%
            </span>
          </div>

          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`w-[${percent}%] h-full bg-[#7C3BED] rounded-full`}
            />
          </div>

          <div className="mt-4 flex justify-between text-sm">
            <p className="text-gray-500">
              {successQuests} of {questRemaining} tasks completed
            </p>
            <div className="flex gap-4">
              <span className="font-semibold text-green-600">
                {successQuests} Done
              </span>
              <span className="font-semibold text-purple-600">
                {Number(questRemaining) - Number(successQuests)} Left
              </span>
            </div>
          </div>
        </div>

        {/* ================= QUICK ADD ================= */}
        <div
          onClick={() => setOpen(true)}
          className="mb-6 cursor-pointer rounded-xl border-2 border-dashed bg-white p-4 text-sm text-gray-400 transition hover:border-[#7C3BED] hover:text-[#7C3BED]"
        >
          + Add a new task in All Tasks...
        </div>

        {/* ================= TASK LIST ================= */}
        {hasNoQuests ? (
          <EmptyTask
            onAdd={() => setOpen(true)}
            onVoiceClick={() => setVoiceOpen(true)}
          />
        ) : (
          data?.data?.map((data) => (
            <TaskSection key={data.key} title={data.key}>
              {data.quests.map((quest) => (
                <TaskItem
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
                  priority={"Medium"}
                  completed={quest.status === "COMPLETED"}
                  failed={quest.status === "FAILED"}
                />
              ))}
            </TaskSection>
          ))
        )}
      </div>

      {/* ================= DRAWERS & MODALS ================= */}
      <AddTaskDrawer open={open} onClose={() => setOpen(false)} />
      <VoiceCommand
        open={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        locked={(session?.data.level || 0) < 2}
      />

      {/* Quest reflection modal: opens after completing a quest (or can be opened manually) */}
      <QuestReflectionModal
        isOpen={reflectionOpen}
        setIsOpen={setReflectionOpen}
        mode={reflectionMode}
        questId={reflectionQuestId}
        questSuccessed={true}
      />
    </>
  );
}
