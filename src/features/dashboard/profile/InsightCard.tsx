import { motion } from "framer-motion";
import { UserModel } from "@/data/models/userModel";

interface InsightCardProps {
  user: UserModel;
}

export default function InsightCard({ user }: InsightCardProps) {
  const completedFolders = user.questFolders?.filter((folder) => folder.progress === 100).length || 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="max-w-md bg-linear-to-br from-[#7C3BED] to-purple-500 text-white rounded-2xl p-6"
    >
      <h3 className="font-semibold mb-2">Insight AI</h3>
      <p className="text-sm opacity-90">
        Kamu sudah menuntaskan {user.totalQuestCompleted || 0} quest dengan {completedFolders} folder selesai total.
      </p>

      <div className="mt-4 bg-white/20 px-4 py-2 rounded-lg text-sm inline-block">
        Status akun: {user.isOnboarded ? "Onboarded" : "Belum Onboarded"}
      </div>
    </motion.div>
  );
}