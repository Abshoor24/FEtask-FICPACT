import { AchievementProgressModel } from '@/data/models/achievementModel';
import React from 'react'
import AchievementList from './AchievementList';

interface Props {
    achievements: AchievementProgressModel[]
}

export default function AllAchievementSection({ achievements }: Props) {
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
