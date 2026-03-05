"use client";

import { Plus } from "lucide-react";

export default function AddTaskButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg bg-[#7C3BED] px-4 py-2 text-sm font-medium text-white hover:bg-[#6A2EE8] transition"
    >
      <Plus size={16} />
      Add New Task
    </button>
  );
}