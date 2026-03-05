"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import TaskSection from "./TaskSection";
import TaskItem from "./TaskItem";
import AddTaskDrawer from "../AddTaskDrawer";
import AddTaskButton from "../AddTaskBtn";

export default function DashboardContent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-full overflow-y-auto px-10 py-8">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-8">
          {/* LEFT */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
            <p className="text-sm text-gray-500">
              You have 7 tasks remaining for today
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
              65%
            </span>
          </div>

          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full w-[65%] bg-[#7C3BED] rounded-full" />
          </div>

          <div className="mt-4 flex justify-between text-sm">
            <p className="text-gray-500">
              13 of 20 tasks completed
            </p>
            <div className="flex gap-4">
              <span className="font-semibold text-green-600">
                12 Done
              </span>
              <span className="font-semibold text-purple-600">
                8 Left
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

        <TaskSection title="Today">
          <TaskItem
            title="Review Q4 Marketing Proposal"
            tag="WORK"
            priority="High"
          />
          <TaskItem
            title="Buy ergonomic office chair"
            tag="PERSONAL"
          />
          <TaskItem
            title="Team sync for project Alpha"
            tag="WORK"
            completed
          />
        </TaskSection>

        <TaskSection title="Tomorrow">
          <TaskItem
            title="Prepare presentation for Stakeholders"
            tag="WORK"
            priority="Medium"
          />
          <TaskItem
            title="Grocery shopping for weekend trip"
            tag="PERSONAL"
          />
        </TaskSection>
      </div>

      <AddTaskDrawer
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}