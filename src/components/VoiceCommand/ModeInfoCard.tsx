"use client";

import { motion } from "framer-motion";
import { MODE_CONFIG } from "./constants";
import { ModeInfoCardProps } from "./types";

export default function ModeInfoCard({ mode }: ModeInfoCardProps) {
  const cfg = MODE_CONFIG[mode];
  const Icon = cfg.icon;

  return (
    <motion.div
      key={mode}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="flex gap-3 rounded-xl border border-purple-100 bg-purple-50 px-4 py-3"
    >
      <div className="mt-0.5 shrink-0 flex h-6 w-6 items-center justify-center rounded-md bg-[#7C3BED]/10">
        <Icon size={13} className="text-[#7C3BED]" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-800 mb-0.5">
          Mode:{" "}
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cfg.badge}`}
          >
            {cfg.label}
          </span>
        </p>
        <p className="text-xs text-gray-500 leading-relaxed">{cfg.infoText}</p>
      </div>
    </motion.div>
  );
}
