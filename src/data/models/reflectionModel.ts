export type QuestLevel = "HIGH" | "NORMAL" | "LOW";

export interface CreateReflection {
  notificationId: string;
}

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

export interface ReflectionModel {
  id: string;
  content: string;

  userId: string;

  createdAt: Date;
  updatedAt: Date;
}
// export type UserWeeklyReflection = UserFailedReflection;
