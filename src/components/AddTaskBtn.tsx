"use client";

import { LockKeyhole, Mic, Plus } from "lucide-react";

interface AddTaskButtonProps {
  onClick: () => void;
  onVoiceClick: () => void;
  voiceLocked: boolean;
}

export default function AddTaskButton({
  onClick,
  onVoiceClick,
  voiceLocked
}: AddTaskButtonProps) {
  return (
    <div className="flex items-center gap-2">
      {/* Voice Command Button */}
      <button
        onClick={onVoiceClick}
        title={voiceLocked ? "Capai level 2 untuk membuka" : "Buat task dengan suara"}
        disabled={voiceLocked}
        className="relative flex items-center justify-center w-10 h-10 rounded-lg border-2 border-dashed border-[#7C3BED]/40 text-[#7C3BED] bg-[#7C3BED]/5 transition hover:bg-[#7C3BED]/10 hover:border-[#7C3BED] hover:scale-105 active:scale-95"
      >
        {voiceLocked && (
          <div className="absolute inset-0 bg-gray-300/90 bg-opacity-50 rounded-lg flex items-center justify-center">
            <LockKeyhole className="w-4 h-4" />
          </div>
        )}
        <Mic size={17} />
      </button>

      {/* Manual Add Task Button */}
      <button
        onClick={onClick}
        className="flex items-center gap-2 rounded-lg bg-[#7C3BED] px-4 py-2 text-sm font-medium text-white hover:bg-[#6A2EE8] transition"
      >
        <Plus size={16} />
        Add New Task
      </button>
    </div>
  );
}
