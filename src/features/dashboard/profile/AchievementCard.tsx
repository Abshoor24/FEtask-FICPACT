import { motion } from "framer-motion";

export default function AchievementCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white border rounded-2xl p-5 text-center cursor-default"
    >
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#7C3BED]/10 flex items-center justify-center font-bold text-[#7C3BED]">
        ★
      </div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-xs text-gray-500 mt-1">{desc}</p>
    </motion.div>
  );
}