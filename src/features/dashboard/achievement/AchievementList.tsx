"use client"

import { useClaimAchievement } from '@/data/hooks/useAchievements'
import { AchievementProgressModel } from '@/data/models/achievementModel'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2, Trophy, Folder, Star, Target, BookOpen } from 'lucide-react'
import { useEffect } from 'react'

interface Props {
    data: AchievementProgressModel
    index: number
}

export default function AchievementList({ data, index }: Props) {
    const queryClient = useQueryClient()
    const { id, name, description, progress, current, isUnlocked, isClaimed, criteria: { target, type: achievementType } } = data

    const { mutate, isPending, isSuccess } = useClaimAchievement()
    const handleClaim = () => {
        mutate(id)
    }

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ["userAchievements"], refetchType: "all" });
    }, [isSuccess])

    return (
        <div
            className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition"
        >
            {/* ICON */}
            <div className="w-12 h-12 rounded-full bg-[#7C3BED]/10 flex items-center justify-center mb-4">
                {achievementType === "folder" && <Folder size={20} className="text-[#7C3BED]" />}
                {achievementType === "level" && <Star size={20} className="text-[#7C3BED]" />}
                {achievementType === "quest" && <Target size={20} className="text-[#7C3BED]" />}
                {achievementType === "reflection" && <BookOpen size={20} className="text-[#7C3BED]" />}
                {!["folder", "level", "quest", "reflection"].includes(achievementType) && <Trophy size={20} className="text-[#7C3BED]" />}
            </div>

            {/* TITLE */}
            <div>
                <h3 className="font-semibold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                    {description}
                </p>
            </div>

            {/* PROGRESS */}
            <div className="mt-5">
                <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div
                        className="h-2 bg-[#7C3BED] rounded-full"
                        style={{ width: `${progress || 0}%` }}
                    ></div>
                </div>

                <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>{current}{" "}{achievementType}</span>
                    <span>{target}{" "}{achievementType}</span>
                </div>
            </div>

            {/* BUTTON */}
            <div className="mt-4">
                {isClaimed ? (
                    <button className="w-full py-2 rounded-lg bg-gray-100 text-gray-500 text-sm">
                        Sudah klaim
                    </button>
                ) : isUnlocked ? (
                    <button
                        onClick={handleClaim}
                        className="flex items-center justify-center w-full py-2 rounded-lg bg-[#7C3BED] text-white text-sm font-medium hover:bg-[#6d33d6]"
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                            "Klaim Hadiah"
                        )}
                    </button>
                ) : (
                    <button className="w-full py-2 rounded-lg bg-gray-100 text-gray-600 text-sm">
                        Belum terpenuhi
                    </button>
                )}
            </div>
        </div>
    )
}
