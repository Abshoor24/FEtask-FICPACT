// Quest Model - Quest types and interfaces only

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

// API Request/Response types
export interface CreateQuestRequest {
    name: string;
    description?: string;
    folderId: string;
    deadLineAt: string;
}

export interface UpdateQuestRequest {
    name?: string;
    description?: string;
    deadLineAt?: string;
    isSuccess?: boolean;
    completedAt?: string;
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
