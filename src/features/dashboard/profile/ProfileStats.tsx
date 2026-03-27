import { useState } from "react";
import StatCard from "./StatCard";
import { UserModel } from "@/data/models/userModel";
import UpdateReflectionModal from "./UpdateReflectionModal";

interface ProfileStatsProps {
  user: UserModel;
}

export default function ProfileStats({ user }: ProfileStatsProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const reflectionDate = user.nextReflection ? new Date(user.nextReflection) : null;
  const reflectionNote = reflectionDate
    ? `${reflectionDate.toLocaleDateString("id-ID", { day: "numeric", month: "long" })} pukul ${reflectionDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`
    : "Belum dijadwalkan";

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Quest Selesai" value={String(user.totalQuestCompleted || 0)} />
        <StatCard title="Total EXP" value={String(user.totalExp || 0)} />
        <StatCard 
          title="Hari Refleksi" 
          value={`${user.reflectionDays || 0} Hari`} 
          note={`Refleksi berikutnya: ${reflectionNote}`} 
          onClick={() => setModalOpen(true)}
        />
      </div>

      <UpdateReflectionModal 
        isOpen={modalOpen} 
        setIsOpen={setModalOpen} 
        currentDays={user.reflectionDays} 
      />
    </>
  );
}