"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Clock, AlertCircle, CheckCircle2, Circle } from "lucide-react";
import { FolderStatus } from "@/data/models/folderModel";
import { Quest } from "@/data/models/questModel";

interface FolderItemProps {
  folder: {
    id: string;
    name: string;
    icon: string;
    color: string;
    taskCount: number;
    endedAt?: string | null;
    status: FolderStatus;
    quests?: Quest[];
  };
}

function formatEndedAt(endedAt: string): string {
  const date = new Date(endedAt);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffMs < 0) return "Sudah berakhir";
  if (diffDays === 0) return "Berakhir hari ini";
  if (diffDays === 1) return "Berakhir besok";
  if (diffDays <= 7) return `${diffDays} hari lagi`;

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: diffDays > 365 ? "numeric" : undefined,
  });
}

const STATUS_CONFIG: Record<
  FolderStatus,
  { label: string; className: string }
> = {
  [FolderStatus.PENDING]: {
    label: "Aktif",
    className: "bg-blue-100 text-blue-600",
  },
  [FolderStatus.COMPLETED]: {
    label: "Selesai",
    className: "bg-green-100 text-green-600",
  },
  [FolderStatus.FAILED]: {
    label: "Gagal",
    className: "bg-red-100 text-red-600",
  },
  [FolderStatus.EXPIRED]: {
    label: "Kedaluwarsa",
    className: "bg-gray-100 text-gray-500",
  },
};

export default function FolderItem({ folder }: FolderItemProps) {
  const { isOverdue, isDueSoon, progress, completedCount } = useMemo(() => {
    const now = new Date().getTime();
    const endedAtMs = folder.endedAt
      ? new Date(folder.endedAt).getTime()
      : null;
    const overdue = endedAtMs !== null ? endedAtMs < now : false;
    const dueSoon =
      !overdue && endedAtMs !== null
        ? endedAtMs - now < 1000 * 60 * 60 * 24 * 2
        : false;

    const quests = folder.quests ?? [];
    const completed = quests.filter((q) => q.isSuccess).length;
    const total = quests.length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      isOverdue: overdue,
      isDueSoon: dueSoon,
      progress: pct,
      completedCount: completed,
    };
  }, [folder.endedAt, folder.quests]);

  const statusConfig = STATUS_CONFIG[folder.status];
  const quests = folder.quests ?? [];
  const totalQuests = quests.length;
  const isCompleted = folder.status === FolderStatus.COMPLETED;

  return (
    <Link href={`/dashboard/folder/${folder.id}`}>
        <div
  className={`group cursor-pointer rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md border h-[220px] flex flex-col ${
          isCompleted
            ? "border-green-200"
            : isOverdue
              ? "border-red-200"
              : isDueSoon
                ? "border-orange-200"
                : "border-gray-100 hover:border-gray-200"
        }`}
      >
        {/* ── TOP ROW: Icon + Name + Status ── */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-2xl"
            style={{ backgroundColor: `${folder.color}20` }}
          >
            {folder.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900 truncate">
                {folder.name}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusConfig.className}`}
              >
                {statusConfig.label}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {totalQuests === 0
                ? "Belum ada quest"
                : `${completedCount} / ${totalQuests} quest selesai`}
            </p>
          </div>
        </div>

        {/* ── PROGRESS BAR ── */}
        {totalQuests > 0 && (
          <div className="mb-3">
            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  backgroundColor: isCompleted ? "#10B981" : folder.color,
                }}
              />
            </div>
            <p className="mt-1 text-[10px] text-gray-400 text-right">
              {progress}%
            </p>
          </div>
        )}

        {/* ── QUEST LIST (max 3) ── */}
        {quests.length > 0 && (
          <ul className="space-y-1 mb-3">
            {quests.slice(0, 3).map((q) => (
              <li key={q.id} className="flex items-center gap-2">
                {q.isSuccess ? (
                  <CheckCircle2
                    size={13}
                    style={{ color: folder.color }}
                    className="shrink-0"
                  />
                ) : (
                  <Circle size={13} className="shrink-0 text-gray-300" />
                )}
                <span
                  className={`text-xs truncate ${
                    q.isSuccess ? "line-through text-gray-400" : "text-gray-700"
                  }`}
                >
                  {q.name}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* ── FOOTER: deadline badge + color dot ── */}
        <div className="flex items-center justify-between pt-3 border-t">
          {folder.endedAt ? (
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                isOverdue
                  ? "text-red-500"
                  : isDueSoon
                    ? "text-orange-500"
                    : "text-gray-400"
              }`}
            >
              {isOverdue ? <AlertCircle size={11} /> : <Clock size={11} />}
              {formatEndedAt(folder.endedAt)}
            </span>
          ) : (
            <span className="text-xs text-gray-400">Tanpa deadline</span>
          )}

          <div
            className="h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: folder.color }}
          />
        </div>
      </div>
    </Link>
  );
}
