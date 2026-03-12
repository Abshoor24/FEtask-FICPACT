"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { PulseRingProps } from "./types";

// ─── Ring config ───────────────────────────────────────────────────────────────
// Semua ring pakai keyframe [0 → peak → 0] agar loop restart mulus tanpa loncatan
const RINGS = [
  { maxScale: 1.7, peakOpacity: 0.5, duration: 2.1, delay: 0 },
  { maxScale: 2.3, peakOpacity: 0.35, duration: 2.1, delay: 0.6 },
  { maxScale: 2.9, peakOpacity: 0.2, duration: 2.1, delay: 1.2 },
];

export default function PulseRing({ active, onClick }: PulseRingProps) {
  return (
    <div
      className="relative flex items-center justify-center cursor-pointer"
      style={{ width: 80, height: 80 }}
      onClick={onClick}
    >
      {/* ── Pulse rings ── */}
      <AnimatePresence>
        {active &&
          RINGS.map((ring, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-[#7C3BED]"
              style={{ width: 80, height: 80 }}
              // Selalu mulai dari nilai yang sama dengan akhir loop → tidak ada loncatan
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                // 3-titik simetris: mulai kecil → melebar → hilang
                scale: [1, ring.maxScale * 0.6, ring.maxScale],
                opacity: [0, ring.peakOpacity, 0],
              }}
              exit={{
                opacity: 0,
                scale: 1,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              transition={{
                duration: ring.duration,
                delay: ring.delay,
                repeat: Infinity,
                ease: "easeOut",
                // repeatType "loop" + keyframe simetris → tidak ada jump saat restart
                repeatType: "loop",
                // pastikan scale & opacity sync dalam satu timeline
                times: [0, 0.4, 1],
              }}
            />
          ))}
      </AnimatePresence>

      {/* ── Mic button ── */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className={`relative z-10 flex items-center justify-center rounded-full shadow-lg transition-colors duration-300 ${
          active
            ? "bg-[#7C3BED] text-white shadow-[#7C3BED]/40"
            : "bg-gray-100 text-gray-400 hover:bg-[#7C3BED]/10 hover:text-[#7C3BED]"
        }`}
        style={{ width: 80, height: 80 }}
      >
        <AnimatePresence mode="wait">
          {active ? (
            <motion.span
              key="mic-on"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <Mic size={30} />
            </motion.span>
          ) : (
            <motion.span
              key="mic-off"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <MicOff size={26} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
