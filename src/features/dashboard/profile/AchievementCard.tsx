import { motion } from "framer-motion";
import { UserAchievementSummary } from "@/data/models/userModel";

export default function AchievementCard({
  achievement,
}: {
  achievement: UserAchievementSummary;
}) {
  const achievedAt = new Date(achievement.achievedAt).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white border rounded-2xl p-5 text-center cursor-default"
    >
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#7C3BED]/10 flex items-center justify-center font-bold text-[#7C3BED]">
        ★
      </div>
      <h4 className="font-semibold">{achievement.achievement?.name || `Achievement #${achievement.achievementId}`}</h4>
      <p className="text-xs text-gray-500 mt-1">{achievement.achievement?.description || `Tercapai pada ${achievedAt}`}</p>
      <p className="text-xs text-[#7C3BED] mt-1 font-medium">+{achievement.achievement?.expReward || 0} EXP</p>
      <span
        className={`inline-block mt-3 px-2 py-1 text-[10px] rounded-full font-semibold ${achievement.isClaimed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
      >
        {achievement.isClaimed ? "Sudah Diklaim" : "Belum Diklaim"}
      </span>
    </motion.div>
  );
}