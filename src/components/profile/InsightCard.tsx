import { motion } from "framer-motion";

export default function InsightCard() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="max-w-md bg-linear-to-br from-[#7C3BED] to-purple-500 text-white rounded-2xl p-6"
    >
      <h3 className="font-semibold mb-2">Insight AI</h3>
      <p className="text-sm opacity-90">
        Kamu paling fokus di pagi hari (08.00 – 10.00).
      </p>

      <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm">
        Lihat Detail Fokus
      </button>
    </motion.div>
  );
}