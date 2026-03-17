import { AchievementProgressModel } from '@/data/models/achievementModel'
import { Trophy } from 'lucide-react'
import React from 'react'

interface Props {
    data: AchievementProgressModel
    index: number
}

export default function AchievementList({ data, index }: Props) {
    const { name, description, progress, current, isUnlocked, isClaimed, criteria: { target } } = data
    return (
        <div
            className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition"
        >
            {/* ICON */}
            <div className="w-12 h-12 rounded-full bg-[#7C3BED]/10 flex items-center justify-center mb-4">
                <Trophy size={20} className="text-[#7C3BED]" />
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
                    <span>{current}</span>
                    <span>{target}</span>
                </div>
            </div>

            {/* BUTTON */}
            <div className="mt-4">
                {isUnlocked && !isClaimed && (
                    <button className="w-full py-2 rounded-lg bg-[#7C3BED] text-white text-sm font-medium hover:bg-[#6d33d6]">
                        Klaim Hadiah
                    </button>
                )}

                {isUnlocked && isClaimed && (
                    <button className="w-full py-2 rounded-lg bg-gray-100 text-gray-500 text-sm">
                        Sudah Diambil
                    </button>
                )}

                {!isUnlocked && !isClaimed && (
                    <button className="w-full py-2 rounded-lg bg-gray-100 text-gray-600 text-sm">
                        Belum terpenuhi
                    </button>
                )}
            </div>
        </div>
    )
}
