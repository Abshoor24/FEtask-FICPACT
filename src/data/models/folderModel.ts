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
    icon?: string | null;
    color?: string | null;
    description?: string | null;
    status: FolderStatus;
    userId: string;
    createdAt: string;
    endedAt?: string | null;
    updatedAt: string;
}

// Detail response for GET /folders/:id
export interface FolderDetailResponse extends QuestFolder {
    quests: Quest[];
}

// API Request/Response types
export interface CreateQuestFolderRequest {
    name: string;
    description?: string | null;
    icon?: string | null;
    color?: string | null;
    endedAt: string;
}

export interface UpdateQuestFolderRequest {
    name?: string;
    description?: string | null;
    icon?: string | null;
    color?: string | null;
    status?: FolderStatus;
    endedAt?: string | null;
}

// Extended types for UI
export interface FolderWithStats extends QuestFolder {
    taskCount: number;
    completedCount: number;
    pendingCount: number;
    quests: Quest[];
}
