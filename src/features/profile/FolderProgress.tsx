import { motion } from "framer-motion";

export default function FolderProgress({
  title,
  progress,
}: {
  title: string;
  progress: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white border rounded-2xl p-5"
    >
      <div className="flex justify-between mb-2 text-sm">
        <span className="font-medium">{title}</span>
        <span className="text-gray-500">{progress}%</span>
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-2 bg-[#7C3BED]"
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}