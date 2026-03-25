import { apiClient } from "@/common/libs/api-client";
import {
  NotificationListResponse,
  NotificationModel,
} from "../models/notificationModel";

class NotificationService {
  public async getAllNotifications(): Promise<{
    data: NotificationListResponse;
  } | null> {
    return await apiClient<{ data: NotificationListResponse }>({
      url: "/notifications",
      method: "GET",
    });
  }

  public async getNotificationById(
    id: string
  ): Promise<{ data: NotificationModel } | null> {
    return await apiClient<{ data: NotificationModel }>({
      url: `/notifications/${id}/detail`,
      method: "GET",
    });
  }

  public async markAsRead(
    id: string
  ): Promise<{ data: NotificationModel } | null> {
    return await apiClient<{ data: NotificationModel }>({
      url: `/notifications/${id}/mark-as-read`,
      method: "PATCH",
    });
  }
}

export const notificationService = new NotificationService();
