import Image from "next/image";
import { motion } from "framer-motion";
import { UserModel } from "@/data/models/userModel";

interface ProfileHeaderProps {
  user: UserModel;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const displayName = user.profile?.name || user.email.split("@")[0] || "Guardian";
  const progressPercent = user.expToNextLevel
    ? Math.min(100, Math.round((user.currentExp / user.expToNextLevel) * 100))
    : 0;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
<div className="relative shrink-0 w-24 h-24 rounded-full border-2 border-[#7C3BED] flex items-center justify-center">
  {user.profile?.avatar ? (
    <Image  
      src={user.profile?.avatar}
      alt={displayName}
      fill
      unoptimized
      className="rounded-full object-cover"
    />
  ) : (
    <span className="text-3xl font-bold text-[#7C3BED] uppercase">
      {displayName.charAt(0)}
    </span>
  )}

  <span className="absolute -bottom-1 -right-1 bg-[#7C3BED] text-white text-[10px] px-2 py-0.5 rounded-full">
    Lv{user.level}
  </span>
</div>

      <div>
        <h1 className="text-xl font-semibold capitalize">{displayName}</h1>
        <p className="text-sm text-gray-500">
          Guardian Level {user.level} • {user.isVerified ? "Terverifikasi" : "Belum Verifikasi"}
        </p>

        <div className="mt-4 w-full md:w-[320px]">
          <div className="flex justify-between text-xs mb-1 text-gray-500">
            <span>Experience Points</span>
            <span>{user.currentExp} / {user.expToNextLevel} XP</span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-2 bg-[#7C3BED]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}