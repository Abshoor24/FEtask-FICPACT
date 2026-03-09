"use client";

import ProfileHeader from "@/features/dashboard/profile/ProfileHeader";
import ProfileStats from "@/features/dashboard/profile/ProfileStats";
import InsightCard from "@/features/dashboard/profile/InsightCard";
import AchievementCard from "@/features/dashboard/profile/AchievementCard";
import FolderProgress from "@/features/dashboard/profile/FolderProgress";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";

export default function ProfilePage() {
  return (
    <motion.main
      className="flex-1 px-10 py-8 space-y-10"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp}>
        <ProfileHeader />
      </motion.div>

      <motion.div variants={fadeUp}>
        <ProfileStats />
      </motion.div>

      <motion.div variants={fadeUp}>
        <InsightCard />
      </motion.div>

      {/* ACHIEVEMENTS */}
      <motion.section variants={fadeUp}>
        <h2 className="text-lg font-semibold mb-4">🏆 Pencapaian Langka</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <AchievementCard title="Early Bird" desc="Selesai sebelum jam 7" />
          <AchievementCard title="Consistency King" desc="Streak 7 hari" />
          <AchievementCard title="Slayer of Exams" desc="Semua ujian kelar" />
        </div>
      </motion.section>

      {/* FOLDERS */}
      <motion.section variants={fadeUp}>
        <h2 className="text-lg font-semibold mb-4">📂 Overview Folder Quest</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FolderProgress title="Ngoding" progress={40} />
          <FolderProgress title="Ngocok" progress={40} />
          <FolderProgress title="Ulangan MK2 Cik" progress={40} />
        </div>
      </motion.section>
    </motion.main>
  );
}
