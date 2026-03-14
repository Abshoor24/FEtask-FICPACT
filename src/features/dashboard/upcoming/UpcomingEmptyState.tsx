import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";
import { CalendarClock, Sparkles } from "lucide-react";

export default function UpcomingEmptyState({ onAdd }: { onAdd: () => void }) {
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
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 animate-pulse" />
        {/* Inner ring */}
        <div className="absolute inset-3 rounded-full bg-white/60" />
        {/* Icon circle */}
        <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-300">
          <CalendarClock className="w-9 h-9 text-blue-400" />
        </div>
        {/* Sparkle accent */}
        <motion.div
          className="absolute top-1 right-3"
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
          Belum ada quest mendatang! 📅
        </h3>
        <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
          Jadwal quest-mu masih kosong. Rencanakan quest untuk hari-hari
          mendatang dan tetap produktif!
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        variants={fadeUp}
        onClick={onAdd}
        whileHover={{
          scale: 1.04,
          boxShadow: "0 12px 30px -8px rgba(59, 130, 246, 0.4)",
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#7C3BED] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-shadow"
      >
        <Sparkles size={16} />
        Rencanakan Quest Baru
      </motion.button>
    </motion.div>
  );
}
