import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";
import { Sun, Sparkles } from "lucide-react";

export default function TodayEmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 gap-6"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Animated Icon */}
      <motion.div
        variants={fadeUp}
        className="relative flex items-center justify-center w-32 h-32"
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-100 to-amber-100 animate-pulse" />
        {/* Inner ring */}
        <div className="absolute inset-3 rounded-full bg-white/60" />
        {/* Icon circle */}
        <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-50 to-amber-50 border-2 border-dashed border-purple-300">
          <Sun className="w-9 h-9 text-amber-400" />
        </div>
        {/* Sparkle accent */}
        <motion.div
          className="absolute top-2 right-4"
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-5 h-5 text-purple-400" />
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col items-center gap-2 text-center"
      >
        <h3 className="text-xl font-bold text-gray-800">
          Hari ini masih kosong! ☀️
        </h3>
        <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
          Belum ada quest untuk hari ini. Mulai tambahkan task dan selesaikan
          misi harianmu untuk mendapatkan XP!
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        variants={fadeUp}
        onClick={onAdd}
        whileHover={{ scale: 1.04, boxShadow: "0 12px 30px -8px rgba(124, 59, 237, 0.4)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3BED] to-[#9B5BFF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-shadow"
      >
        <Sparkles size={16} />
        Tambah Quest Hari Ini
      </motion.button>
    </motion.div>
  );
}
