export type QuestLevel = "HIGH" | "NORMAL" | "LOW";

export interface CreateUserReflection {
    questId: string;
    questLevel: QuestLevel;
    questStatus: boolean;
    reasons: string[];
}

export interface UserFailedReflection {
    reasons: string[];
    addOns?: string;
}

// export type UserWeeklyReflection = UserFailedReflection;