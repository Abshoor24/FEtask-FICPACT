export interface UserModel {
    id: string;
    email: string;
    phone: string | null;
    currentExp: number;
    expToNextLevel: number;
    level: number;
    totalExp: number;
    isVerified: boolean;
    isFirstReflection?: boolean;
    isOnboarded?: boolean;
    reflectionDays: number;
    nextReflection: string | null;
    lastReflection: string;
    createdAt: string;
    updatedAt: string;
    profile: UserProfileInfo | null;
    userAchievements: UserAchievementSummary[];
    questFolders: UserQuestFolder[];
    totalQuestCompleted: number;
}

export interface UserProfileInfo {
    name?: string;
    avatar?: string;
}

export interface UserAchievementSummary {
    id: string;
    userId: string;
    achievementId: string;
    achievedAt: string;
    isClaimed: boolean;
    achievement: AchievementDetail;
}

export interface AchievementDetail {
    id: string;
    name: string;
    description: string;
    expReward: number;
    criteria: {
        type: "folder" | "level" | "quest" | "reflection";
        target: number;
    };
    createdAt: string;
    updatedAt: string;
}

export interface UserQuest {
    id: string;
    name: string;
    description: string;
    expReward: number;
    isSuccess: boolean;
    folderId: string;
    createdAt: string;
    deadLineAt: string;
    completedAt: string | null;
}

export interface UserQuestFolder {
    id: string;
    name: string;
    description: string;
    status: string;
    userId: string;
    createdAt: string;
    endedAt: string;
    updatedAt: string;
    color: string;
    icon: string;
    quests: UserQuest[];
    progress: number;
}

export type UserProfileApiResponse = UserModel | { data: UserModel };


