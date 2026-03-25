export type NotificationType =
  | "QUEST_FAILED"
  | "QUEST_COMPLETED"
  | "REFLECTION_TRIGGER"
  | "PUNISHMENT_REQUIRED"
  | "STREAK_LOST";

export interface NotificationModel {
  id: string;
  userId: string;
  type: NotificationType;
  title: string | null;
  message: string | null;
  data: Record<string, any> | null;
  isRead: boolean;
  createdAt: string;
  readedAt: string | null;
}

export interface NotificationListResponse {
  all: NotificationModel[];
  readed: NotificationModel[];
  unread: NotificationModel[];
}
