

export type AchievementTypeModel = "folder" | "level" | "quest" | "reflection"

export interface AchievementCriteriaModel {
    type: AchievementTypeModel
    target: number
}

export interface AchievementModel {
    id: string
    name: string
    description?: string
    expReward: number
    criteria: AchievementCriteriaModel
    createdAt: string
    updatedAt: string
    users: UserAchievementModel[]
}


export interface UserAchievementModel {
    id: string
    userId: string
    achievementId: string
    isClaimed: boolean
    achievedAt: string
    achievement: AchievementModel
}

export interface AchievementProgressModel extends AchievementModel {
    progress: number
    current: number
    isUnlocked: boolean
    isClaimed: boolean
    type: "folder" | "level" | "quest" | "reflection"
}

export type AchievementProgressResponse = {
    total: number
    achievements: AchievementProgressModel[]
    unclaimed: AchievementProgressModel[]
    claimed: AchievementProgressModel[]
    unlocked: AchievementProgressModel[]
}