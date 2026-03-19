import { AchievementProgressModel } from '@/data/models/achievementModel';
import React from 'react'
import AchievementList from './AchievementList';
import { Trophy } from 'lucide-react';

interface Props {
    achievements: AchievementProgressModel[]
}

export default function AllAchievementSection({ achievements }: Props) {
    if (!achievements || achievements.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <div className="bg-gray-50 p-5 rounded-full mb-4 ring-8 ring-gray-50/50">
                    <Trophy className="w-12 h-12 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Belum ada pencapaian</h3>
                <p className="text-gray-500 mt-2 text-center max-w-md text-sm">
                    Saat ini belum ada medali atau pencapaian untuk kategori ini. Terus selesaikan tugas-tugas kamu!
                </p>
            </div>
        )
    }

    const sorted = [...achievements].sort((a, b) => {
        const scoreA = Number(a.isClaimed) * 2 + Number(a.isUnlocked)
        const scoreB = Number(b.isClaimed) * 2 + Number(b.isUnlocked)
        return scoreB - scoreA
    })

    return (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted?.map((item, index) => {
                return (
                    <AchievementList key={index} data={item} index={index} />
                );
            })}
        </section>
    )
}
