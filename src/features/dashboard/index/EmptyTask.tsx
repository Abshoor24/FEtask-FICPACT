import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";
import { ClipboardList } from "lucide-react";

export default function EmptyTask({ onAdd }: { onAdd: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-24 gap-6"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Icon */}
      <motion.div
        variants={fadeUp}
        className="relative flex items-center justify-center w-28 h-28"
      >
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-purple-100 animate-pulse" />
        <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-purple-50 border-2 border-dashed border-purple-300">
          <ClipboardList className="w-9 h-9 text-purple-400" />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col items-center gap-2 text-center"
      >
        <h3 className="text-xl font-bold text-gray-800">No tasks yet!</h3>
        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
          Kamu belum punya quest apapun. Yuk mulai tambahkan task pertamamu dan
          raih XP-mu!
        </p>
      </motion.div>

      {/* CTA */}
      <motion.button
        variants={fadeUp}
        onClick={onAdd}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center gap-2 rounded-xl bg-[#7C3BED] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#6A2EE8] transition"
      >
        + Tambah Task Pertamamu
      </motion.button>
    </motion.div>
  );
}
