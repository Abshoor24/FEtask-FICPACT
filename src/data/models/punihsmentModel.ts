export interface GetPunishment {
  punishmentId: string;
}

export interface CreatePunishment {
  name: string;
  deadlineAt: string; // ISO 8601 / RFC 3339 (contoh: "2026-03-23T10:00:00Z")
  questId: string; // UUID
}

export interface UpdatePunishment {
  status: boolean;
  notificationId?: string;
}
