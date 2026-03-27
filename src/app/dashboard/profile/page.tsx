"use client";

import ProfileHeader from "@/features/dashboard/profile/ProfileHeader";
import ProfileStats from "@/features/dashboard/profile/ProfileStats";
import InsightCard from "@/features/dashboard/profile/InsightCard";
import AchievementCard from "@/features/dashboard/profile/AchievementCard";
import FolderProgress from "@/features/dashboard/profile/FolderProgress";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";
import { useUserProfile } from "@/data/hooks/useUser";
import { UserModel } from "@/data/models/userModel";

export default function ProfilePage() {
  const { data, isLoading } = useUserProfile();
  const user = (data && "data" in data ? data.data : data) as UserModel | undefined;

  if (isLoading) {
    return (
      <main className="flex-1 px-4 md:px-10 py-6 md:py-8 space-y-6">
        <div className="h-28 rounded-2xl bg-gray-200 animate-pulse" />
        <div className="h-32 rounded-2xl bg-gray-200 animate-pulse" />
        <div className="h-40 rounded-2xl bg-gray-200 animate-pulse" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex-1 px-4 md:px-10 py-6 md:py-8">
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
          Data profile tidak ditemukan.
        </div>
      </main>
    );
  }

  return (
    <motion.main
      className="flex-1 px-4 md:px-10 py-6 md:py-8 space-y-10"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp}>
        <ProfileHeader user={user} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <ProfileStats user={user} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <InsightCard user={user} />
      </motion.div>

      {/* ACHIEVEMENTS */}
      <motion.section variants={fadeUp}>
        <h2 className="text-lg font-semibold mb-4">🏆 Pencapaian Langka</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {user.userAchievements.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
              Belum ada achievement yang tercatat.
            </div>
          ) : (
            user.userAchievements.slice(0, 6).map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))
          )}
        </div>
      </motion.section>

      {/* FOLDERS */}
      <motion.section variants={fadeUp}>
        <h2 className="text-lg font-semibold mb-4">📂 Overview Folder Quest</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {user.questFolders.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
              Belum ada folder quest.
            </div>
          ) : (
            user.questFolders.slice(0, 6).map((folder) => (
              <FolderProgress key={folder.id} folder={folder} />
            ))
          )}
        </div>
      </motion.section>
    </motion.main>
  );
}
