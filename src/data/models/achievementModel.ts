// model Achievement {
//   id          String @id @default (uuid())
//   name        String @unique
//   description String ?
// expReward   Int @default (0)
//   criteria    Json
//   createdAt   DateTime @default (now())
//   updatedAt   DateTime @updatedAt
//   users       UserAchievement[]
// }

import { UserModel } from "./userModel"

export interface AchievementModel {
    id: string
    name: string
    description?: string
    expReward: number
    criteria: {
        type: "folder" | "level" | "quest" | "reflection"
        target: number
    }
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