// Quest Service - Quest operations using class pattern

import { apiClient } from "@/common/libs/api-client";
import {
    Quest,
    CreateQuestRequest,
    UpdateQuestRequest,
    AllQuestResponse,
} from "@/data/models/questModel";

class QuestService {
    // Get all quests for current user
    public async getAll(): Promise<{ data: AllQuestResponse[] }> {
        return await apiClient<{ data: AllQuestResponse[] }>({
            url: "/quests",
            method: "GET",
        });
    }
    
    public async updateCompletedQuest(questId: string): Promise<Quest> {
        return await apiClient<Quest>({
            url: `/quests/${questId}/complete`,
            method: "PUT",
        });
    }

    // Get quests by folder
    public async getByFolder(folderId: string): Promise<Quest[]> {
        return await apiClient<Quest[]>({
            url: `/folders/${folderId}/quests`,
            method: "GET",
        });
    }

    // Get quest by ID
    public async getById(questId: string): Promise<Quest> {
        return await apiClient<Quest>({
            url: `/quests/${questId}`,
            method: "GET",
        });
    }

    // Create new quest
    public async create(data: CreateQuestRequest): Promise<Quest> {
        return await apiClient<Quest>({
            url: "/quests",
            method: "POST",
            data,
        });
    }

    // Update quest
    public async update(questId: string, data: UpdateQuestRequest): Promise<Quest> {
        return await apiClient<Quest>({
            url: `/quests/${questId}`,
            method: "PUT",
            data,
        });
    }

    // Complete quest
    public async complete(questId: string): Promise<Quest> {
        return await apiClient<Quest>({
            url: `/quests/${questId}/complete`,
            method: "POST",
        });
    }

    // Delete quest
    public async delete(questId: string): Promise<void> {
        return await apiClient<void>({
            url: `/quests/${questId}`,
            method: "DELETE",
        });
    }


    // Check if quest is overdue
    public isOverdue(quest: Quest): boolean {
        if (quest.isSuccess || quest.completedAt) return false;
        return new Date(quest.deadLineAt) < new Date();
    }

    // Get time left until deadline (short format: 2d 5h)
    public getTimeLeft(deadline: string): string {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const diff = deadlineDate.getTime() - now.getTime();

        if (diff < 0) return "Overdue";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    }

    // Get time left in human readable format
    public getTimeLeftHuman(deadline: string): string {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const diff = deadlineDate.getTime() - now.getTime();

        if (diff < 0) return "Overdue";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days > 1) return `${days} days left`;
        if (days === 1) return `1 day left`;
        if (hours > 1) return `${hours} hours left`;
        if (hours === 1) return `1 hour left`;
        return "Due soon";
    }

    // Format date for input (datetime-local)
    public formatDateForInput(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    // Check if quest is completed
    public isCompleted(quest: Quest): boolean {
        return quest.isSuccess && !!quest.completedAt;
    }

    // Check if quest is pending
    public isPending(quest: Quest): boolean {
        return !quest.isSuccess && !quest.completedAt;
    }

    // Get quest status
    public getStatus(quest: Quest): "completed" | "overdue" | "pending" {
        if (this.isCompleted(quest)) return "completed";
        if (this.isOverdue(quest)) return "overdue";
        return "pending";
    }

    // Format deadline display (Today, Tomorrow, or date)
    public formatDeadline(deadline: string): string {
        const date = new Date(deadline);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const deadlineDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        if (deadlineDay.getTime() === today.getTime()) {
            return `Today, ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
        }
        if (deadlineDay.getTime() === tomorrow.getTime()) {
            return `Tomorrow, ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
        }
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
}

export const questService = new QuestService();
