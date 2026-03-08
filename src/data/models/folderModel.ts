// Folder Model - QuestFolder types and interfaces
import { Quest } from "./questModel";

export enum FolderStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    EXPIRED = "EXPIRED",
}

export interface QuestFolder {
    id: string;
    name: string;
    icon?: string;
    color?: string;
    description?: string;
    status: FolderStatus;
    userId: string;
    createdAt: string;
    endedAt?: string;
    updatedAt: string;
}

// API Request/Response types
export interface CreateQuestFolderRequest {
    name: string;
    description?: string | null;
    icon?: string;
    color?: string;
    endedAt: string;
}

export interface UpdateQuestFolderRequest {
    name?: string;
    description?: string;
    icon?: string;
    color?: string;
    status?: FolderStatus;
    endedAt?: string;
}

// Extended types for UI
export interface FolderWithStats extends QuestFolder {
    taskCount: number;
    completedCount: number;
    pendingCount: number;
    quests: Quest[];
}
