"use client";

import { motion } from "framer-motion";
import { MODE_CONFIG } from "./constants";
import { AIMode, ModeSelectorProps } from "./types";

const MODES: AIMode[] = ["with-folder", "task-only"];

export default function ModeSelector({
  value,
  onChange,
  disabled,
}: ModeSelectorProps) {
  return (
    <div className="relative flex rounded-xl border border-gray-200 bg-gray-50 p-1 gap-1">
      {/* Sliding indicator */}
      <motion.span
        className="absolute top-1 bottom-1 rounded-lg bg-[#7C3BED] shadow-sm shadow-[#7C3BED]/30"
        layoutId="mode-indicator"
        style={{
          width: "calc(50% - 6px)",
          left: value === "with-folder" ? 4 : "calc(50% + 2px)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
      />

      {MODES.map((mode) => {
        const cfg = MODE_CONFIG[mode];
        const Icon = cfg.icon;
        const isActive = value === mode;

        return (
          <button
            key={mode}
            type="button"
            disabled={disabled}
            onClick={() => onChange(mode)}
            className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
              isActive ? "text-white" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon size={15} />
            <span>{cfg.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
