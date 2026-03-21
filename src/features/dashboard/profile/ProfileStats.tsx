import StatCard from "./StatCard";
import { UserModel } from "@/data/models/userModel";

interface ProfileStatsProps {
  user: UserModel;
}

export default function ProfileStats({ user }: ProfileStatsProps) {
  const reflectionNote = user.nextReflection
    ? new Date(user.nextReflection).toLocaleDateString("id-ID")
    : "Belum dijadwalkan";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Quest Selesai" value={String(user.totalQuestCompleted || 0)} />
      <StatCard title="Total EXP" value={String(user.totalExp || 0)} />
      <StatCard title="Hari Refleksi" value={`${user.reflectionDays || 0} Hari`} note={`Refleksi berikutnya: ${reflectionNote}`} />
    </div>
  );
}