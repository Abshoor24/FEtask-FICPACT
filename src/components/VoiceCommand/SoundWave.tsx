"use client";

import { motion } from "framer-motion";
import { SoundWaveProps } from "./types";

const BARS = [3, 5, 8, 5, 10, 6, 4, 8, 5, 3];

export default function SoundWave({ active }: SoundWaveProps) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-10">
      {BARS.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-[#7C3BED]"
          initial={{ scaleY: 0.3, opacity: 0.35 }}
          animate={
            active
              ? { scaleY: [0.3, 1, h / 4, 1, 0.3], opacity: 1 }
              : { scaleY: 0.3, opacity: 0.35 }
          }
          transition={
            active
              ? {
                  scaleY: {
                    duration: 0.8 + i * 0.04,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.07,
                    repeatType: "loop",
                  },
                  opacity: {
                    duration: 0.2,
                  },
                }
              : {
                  scaleY: { duration: 0.3, ease: "easeOut" },
                  opacity: { duration: 0.3 },
                }
          }
          style={{ height: `${h * 3}px`, originY: 0.5 }}
        />
      ))}
    </div>
  );
}
