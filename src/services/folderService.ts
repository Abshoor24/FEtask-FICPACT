// Folder Service - QuestFolder operations using class pattern

import { apiClient } from "@/common/libs/api-client";
import {
    QuestFolder,
    CreateQuestFolderRequest,
    UpdateQuestFolderRequest,
    FolderWithStats,
} from "@/data/models/folderModel";
import { Quest } from "@/data/models/questModel";

class FolderService {
    // Get all folders for current user
    public async getAll(): Promise<{ data: FolderWithStats[] }> {
        return await apiClient<{ data: FolderWithStats[] }>({
            url: "/folders",
            method: "GET",
        });
    }

    public async getUserAvailableFolders(): Promise<{ data: QuestFolder[] }> {
        return await apiClient<{ data: QuestFolder[] }>({
            url: `/folders/user/available`,
            method: "GET",
        })
    }

    // Get folder by ID with quests
    public async getById(folderId: string): Promise<QuestFolder> {
        return await apiClient<QuestFolder>({
            url: `/folders/${folderId}`,
            method: "GET",
        });
    }

    // Create new folder
    public async create(data: CreateQuestFolderRequest): Promise<QuestFolder> {
        return await apiClient<QuestFolder>({
            url: "/folders",
            method: "POST",
            data,
        });
    }

    // Update folder
    public async update(
        folderId: string,
        data: UpdateQuestFolderRequest
    ): Promise<QuestFolder> {
        return await apiClient<QuestFolder>({
            url: `/folders/${folderId}`,
            method: "PUT",
            data,
        });
    }

    // Delete folder
    public async delete(folderId: string): Promise<void> {
        return await apiClient<void>({
            url: `/folders/${folderId}`,
            method: "DELETE",
        });
    }


    // Check if folder can add more quests (max 3)
    public canAddQuest(folder: QuestFolder & { quests?: Quest[] }): boolean {
        return (folder.quests?.length || 0) < 3;
    }

    // Calculate folder completion percentage
    public getFolderProgress(folder: QuestFolder & { quests?: Quest[] }): number {
        if (!folder.quests || folder.quests.length === 0) return 0;
        const completed = folder.quests.filter((q) => q.isSuccess).length;
        return Math.round((completed / folder.quests.length) * 100);
    }



    // Check if folder is completed (all quests done)
    public isCompleted(folder: QuestFolder & { quests?: Quest[] }): boolean {
        if (!folder.quests || folder.quests.length === 0) return false;
        return folder.quests.every((q) => q.isSuccess);
    }

    // Check if folder has any pending quests
    public hasPendingQuests(folder: QuestFolder & { quests?: Quest[] }): boolean {
        if (!folder.quests || folder.quests.length === 0) return false;
        return folder.quests.some((q) => !q.isSuccess && !q.completedAt);
    }

    // Get folder status summary
    public getStatusSummary(folder: QuestFolder & { quests?: Quest[] }): {
        total: number;
        completed: number;
        pending: number;
        overdue: number;
    } {
        const quests = folder.quests || [];
        const now = new Date();

        return {
            total: quests.length,
            completed: quests.filter((q) => q.isSuccess).length,
            pending: quests.filter((q) => !q.isSuccess && !q.completedAt).length,
            overdue: quests.filter(
                (q) => !q.isSuccess && new Date(q.deadLineAt) < now
            ).length,
        };
    }
}

export const folderService = new FolderService();
