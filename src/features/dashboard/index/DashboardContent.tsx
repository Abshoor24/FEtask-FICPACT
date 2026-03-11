"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";

import TaskSection from "./TaskSection";
import TaskItem from "./TaskItem";
import AddTaskButton from "@/components/AddTaskBtn";
import AddTaskDrawer from "@/components/AddTaskDrawer";
import {
  useGetUserQuests,
  useUpdateCompletedQuest,
} from "@/data/hooks/useQuest";
import EmptyTask from "./EmptyTask";

export default function DashboardContent() {
  const [open, setOpen] = useState(false);
  const { data } = useGetUserQuests();
  const { mutate: updateCompletedQuest, isSuccess } = useUpdateCompletedQuest();
  const hasNoQuests = !data?.data || data.data.length === 0;
  const todayQuests = data?.data.find((d) => d.key === "TODAY");
  const questRemaining = todayQuests?.quests.length ?? 0;
  const successQuests =
    todayQuests?.quests.filter((q) => q.status === "COMPLETED").length ?? 0;

  const percent = questRemaining
    ? Math.round((successQuests / questRemaining) * 100)
    : 0;
  const handleClick = (questId: string) => {
    updateCompletedQuest(questId);
  };
  // React.useEffect(() => {
    
  // },[isSuccess])
  return (
    <>
      <div className="h-full overflow-y-auto px-10 py-8">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-8">
          {/* LEFT */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
            <p className="text-sm text-gray-500">
              You have {questRemaining} tasks remaining for today
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

            {/* ADD TASK BUTTON */}
            <AddTaskButton onClick={() => setOpen(true)} />
          </div>
        </div>

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

        <div
          onClick={() => setOpen(true)}
          className="mb-6 cursor-pointer rounded-xl border-2 border-dashed bg-white p-4 text-sm text-gray-400 transition hover:border-[#7C3BED] hover:text-[#7C3BED]"
        >
          + Add a new task in All Tasks...
        </div>

        {hasNoQuests ? (
          <EmptyTask onAdd={() => setOpen(true)} />
        ) : (
          data?.data?.map((data) => (
            <TaskSection key={data.key} title={data.key}>
              {data.quests.map((quest) => (
                <TaskItem
                  key={quest.id}
                  onClick={() => {
                    if (quest.status === "COMPLETED") return;
                    handleClick(quest.id);
                  }}
                  title={quest.name}
                  tag={quest.status}
                  priority={"Medium"}
                  completed={quest.status === "COMPLETED"}
                />
              ))}
            </TaskSection>
          ))
        )}
      </div>

      <AddTaskDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
