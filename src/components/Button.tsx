"use client";

import React from "react";

type QuestButtonProps = {
  label?: string;
  onClick?: () => void;
  className?: string;
};

export default function QuestButton({
  label = "Mulai Quest",
  onClick,
  className = "",
}: QuestButtonProps) {
  return (
    <button
      onClick={onClick}
     className={`
        relative
        rounded-full
        bg-[#7C3BED]
        text-white
        tracking-wide
        text-sm font-medium px-5 py-2
        shadow-[0_5px_0_0_#0f172a]

        transition-all
        active:translate-y-2
        active:shadow-[0_4px_0_0_#0f172a]

        disabled:opacity-60
        disabled:cursor-not-allowed
        disabled:active:translate-y-0
        disabled:active:shadow-[0_10px_0_0_#0f172a]

        ${className}
      `}
    >
      {label}
    </button>
  );
}
