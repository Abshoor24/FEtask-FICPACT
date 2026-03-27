export enum PunishmentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface Punishment {
  questId: string;
  userId: string;
  name: string;
  status: PunishmentStatus;
  createdAt: Date;
  deadlineAt: Date;
}

// model QuestPunishment {
//   questId String @id
//   userId  String

//   name   String
//   status QuestPunishmentStatus @default(PENDING)

//   user  User  @relation(fields: [userId], references: [id], onUpdate: Cascade, onDelete: Cascade)
//   quest Quest @relation(fields: [questId], references: [id], onUpdate: Cascade, onDelete: Cascade)

//   createdAt  DateTime @default(now())
//   deadlineAt DateTime
// }
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
