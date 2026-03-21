import { motion } from "framer-motion";
import { UserQuestFolder } from "@/data/models/userModel";

export default function FolderProgress({
  folder,
}: {
  folder: UserQuestFolder;
}) {
  const completedQuestCount = folder.quests?.filter((quest) => quest.isSuccess).length || 0;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white border rounded-2xl p-5"
    >
      <div className="flex justify-between mb-2 text-sm">
        <span className="font-medium">{folder.icon} {folder.name}</span>
        <span className="text-gray-500">{folder.progress}%</span>
      </div>

      <p className="text-xs text-gray-500 mb-3">
        {completedQuestCount}/{folder.quests?.length || 0} quest selesai
      </p>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-2 bg-[#7C3BED]"
          initial={{ width: 0 }}
          whileInView={{ width: `${folder.progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}