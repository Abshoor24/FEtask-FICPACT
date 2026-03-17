import Header from '@/components/Header';
import { useGetUserAchievements } from '@/data/hooks/useAchievements';
import { Trophy } from 'lucide-react';
import React, { Activity } from 'react'
import AchievementList from './AchievementList';
import AllAchievementSection from './AchievementListSection';

type TabType = "all" | "unlocked" | "claimed" | "unclaimed";
const tabButtonItems = [
    {
        id: "all",
        label: "Semua",
        icon: <Trophy size={20} />
    },
    {
        id: "claimed",
        label: "Sudah Diklaim",
        icon: <Trophy size={20} />
    },
    {
        id: "unclaimed",
        label: "Belum di klaim",
        icon: <Trophy size={20} />
    },
    {
        id: "unlocked",
        label: "Terkunci",
        icon: <Trophy size={20} />
    }
]

export default function AchievementContent() {
    const [openedTab, setOpenedTab] = React.useState<TabType>("all");
    const { data: achievements } = useGetUserAchievements();

    return (
        <div className="flex flex-col h-screen w-full">

            {/* HEADER */}
            <Header />

            {/* CONTENT */}
            <main className="flex-1 bg-[#F6F7FB] overflow-y-auto px-6 md:px-10 py-8">

                {/* TITLE */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Galeri Pencapaian
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Kumpulkan medali dari misi yang diselesaikan untuk membuktikan reputasimu.
                    </p>
                </div>

                {/* FILTER */}
                <div className="flex items-center gap-3 mb-8">
                    {tabButtonItems.map((item, i) => (
                        <button
                            onClick={() => setOpenedTab(item.id as TabType)}
                            key={i} className={`${item.id === openedTab ? "bg-[#7C3BED] text-white" : "bg-gray-200 text-[#7C3BED]"} px-4 py-2 text-sm rounded-full`}>
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* All */}
                <Activity mode={openedTab === "all" ? "visible" : "hidden"} >
                    <AllAchievementSection achievements={achievements?.data?.achievements || []} />
                </Activity>
                {/* Claimed */}

                <Activity mode={openedTab === "claimed" ? "visible" : "hidden"} >
                    <AllAchievementSection achievements={achievements?.data?.claimed || []} />
                </Activity>

                {/* Unclaimed */}
                <Activity mode={openedTab === "unclaimed" ? "visible" : "hidden"} >
                    <AllAchievementSection achievements={achievements?.data?.unclaimed || []} />
                </Activity>


                {/* Unlocked */}
                <Activity mode={openedTab === "unlocked" ? "visible" : "hidden"} >
                    <AllAchievementSection achievements={achievements?.data?.unlocked || []} />
                </Activity>
            </main>
        </div>
    );
}
