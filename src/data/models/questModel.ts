
export interface Quest {
    id: string;
    name: string;
    description?: string;
    expReward: number;
    isSuccess: boolean;
    folderId: string;
    createdAt: string;
    deadLineAt: string;
    completedAt?: string;
}

export interface CreateQuestRequest {
    title: string;
    description?: string;
    folderId: string;
    deadline: string;
}

export interface UpdateQuestRequest {
    name?: string;
    description?: string;
    deadLineAt?: string;
    isSuccess?: boolean;
    completedAt?: string;
}

export interface AllQuestResponse {
    key: string
    quests: QuestWithStatus[]
}

export interface QuestWithStatus extends Quest {
    status: "ONGOING" | "FAILED" | "COMPLETED";
}

// Extended types for UI
export interface QuestWithFolder extends Quest {
    folder: {
        id: string;
        name: string;
        icon?: string;
        color?: string;
    };
}
