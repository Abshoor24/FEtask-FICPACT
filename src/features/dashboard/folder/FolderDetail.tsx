"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Zap,
  CheckCircle2,
  Play,
  Lock,
  MoreVertical,
  Share2,
  Loader2,
  AlertCircle,
  Folder as FolderIcon,
  Clock,
  Plus,
} from "lucide-react";
import { useGetFolderById } from "@/data/hooks/useFolder";
import { useUpdateCompletedQuest } from "@/data/hooks/useQuest";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import QuestReflectionModal from "@/components/QuestReflectionModal";
import AddTaskDrawer from "@/components/AddTaskDrawer";

type Quest = {
  id: string;
  name: string;
  description?: string | null;
  expReward?: number;
  isSuccess: boolean;
  deadLineAt?: string | null;
  completedAt?: string | null;
};

type FolderDetailResponse = {
  id: string;
  name: string;
  description?: string | null;
  status: string;
  userId: string;
  createdAt: string;
  endedAt?: string | null;
  updatedAt: string;
  color?: string | null;
  icon?: string | null;
  quests: Quest[];
};

type QuestUiStatus = "COMPLETED" | "IN_PROGRESS" | "LOCKED";

function formatTime(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });
}

function formatDeadline(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const now = new Date();
  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isSameDay) {
    return `Hari ini, ${formatTime(value)}`;
  }

  return `${date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  })} ${formatTime(value)}`;
}

export default function FolderDetail() {
  const [reflectionOpen, setReflectionOpen] = useState(false);
  const [reflectionQuestId, setReflectionQuestId] = useState<
    string | undefined
  >(undefined);
  const [questDrawerOpen, setQuestDrawerOpen] = useState<boolean>(false);

  const params = useParams();
  const router = useRouter();
  const folderId = params.id as string;
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useGetFolderById(folderId);
  const {
    mutate: updateCompleteQuestMutate,
    isPending,
    isSuccess,
  } = useUpdateCompletedQuest();

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  const handleCompleteQuest = (questId: string) => {
    if (isPending) return;
    updateCompleteQuestMutate(questId, {
      onSuccess: () => {
        setReflectionQuestId(questId);
        setReflectionOpen(true);
        queryClient.invalidateQueries({ queryKey: ["is_first_reflection"] });
      },
      onError: (err) => {
        toast.error(err.message || "Gagal menyelesaikan quest");
      },
    });
  };

  const folder: FolderDetailResponse | null = useMemo(() => {
    if (!data) return null;
    const maybeWrapped = data as unknown as { data?: FolderDetailResponse };
    if (maybeWrapped?.data) return maybeWrapped.data;
    return data as unknown as FolderDetailResponse;
  }, [data]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <Loader2 size={40} className="animate-spin text-purple-600" />
      </div>
    );
  }

  if (isError || !folder) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-20 text-center bg-gray-50">
        <AlertCircle size={48} className="mb-4 text-red-400" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Gagal Memuat Data Folder
        </h3>
        <p className="text-gray-500 mb-6 max-w-sm">
          Maaf, terjadi kesalahan saat mengambil data folder ini. Silakan coba
          lagi.
        </p>
        <button
          onClick={() => refetch()}
          className="rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-purple-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  const folderColor = folder.color || "#7C3BED";
  const folderIcon = folder.icon || "📁";
  const quests = folder.quests ?? [];

  const completedCount = quests.filter((q) => q.isSuccess).length;
  const totalCount = quests.length;
  const progress =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const remaining = Math.max(totalCount - completedCount, 0);
  const isAllCompleted = totalCount > 0 && completedCount === totalCount;

  const firstPendingIndex = quests.findIndex((q) => !q.isSuccess);

  const getQuestStatus = (quest: Quest, index: number): QuestUiStatus => {
    if (quest.isSuccess) return "COMPLETED";
    if (firstPendingIndex === -1) return "LOCKED";
    return index === firstPendingIndex ? "IN_PROGRESS" : "LOCKED";
  };

  return (
    <>
      <div className="min-h-full overflow-y-auto bg-gray-50 pb-12">
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1.5 font-medium text-gray-500 transition hover:text-gray-900"
            >
              <ArrowLeft size={16} />
              Kembali
            </button>
            <span className="text-gray-300">/</span>
            <span className="font-medium text-gray-900 line-clamp-1">
              {folder.name}
            </span>
          </div>

          {/* Header Card */}
          <div
            className="mb-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8"
            style={{
              borderColor: `${folderColor}30`,
              background: `linear-gradient(135deg, ${folderColor}08 0%, white 100%)`,
            }}
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-5">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-sm"
                  style={{ backgroundColor: folderColor, color: "white" }}
                >
                  {folderIcon}
                </div>
                <div className="flex flex-col justify-center pt-1">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                    {folder.name}
                  </h1>
                  <p className="mt-2.5 max-w-2xl text-base font-medium leading-relaxed text-gray-600">
                    {folder.description?.trim()
                      ? folder.description
                      : "Tidak ada deskripsi untuk folder ini. Selesaikan semua quest untuk mendapatkan bonus."}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-end justify-between mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Kemajuan Folder
                  </h2>
                  <p className="text-sm font-medium text-gray-500 mt-0.5">
                    {remaining > 0
                      ? `Selesaikan ${remaining} quest lagi untuk klaim bonus.`
                      : "Selamat! Semua quest telah selesai."}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: isAllCompleted ? "#10B981" : folderColor }}
                  >
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progress}%`,
                    background: isAllCompleted
                      ? "linear-gradient(90deg, #10B981 0%, #059669 100%)"
                      : `linear-gradient(90deg, ${folderColor} 0%, ${folderColor}cc 100%)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quest List Header */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-gray-900">Daftar Quest</h3>
              <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                {totalCount} Total
              </span>
            </div>
          </div>

          {/* Quest Items */}
          <div className="space-y-4">
            {quests.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white py-16 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 mb-3">
                  <FolderIcon size={24} className="text-gray-400" />
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-1">
                  Folder Masih Kosong
                </h4>
                <p className="text-sm font-medium text-gray-500 mb-4">
                  Belum ada quest yang ditambahkan ke dalam folder ini.
                </p>
                <button
                  onClick={() => setQuestDrawerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: folderColor }}
                >
                  <Plus size={18} />
                  Tambah Quest Baru
                </button>
              </div>
            ) : (
              quests.map((quest, index) => {
                const status = getQuestStatus(quest, index);
                const isCompleted = status === "COMPLETED";
                const isInProgress = status === "IN_PROGRESS";

                return (
                  <div
                    key={quest.id}
                    className={`group relative flex flex-col gap-4 overflow-hidden rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between ${
                      isCompleted
                        ? "border-emerald-200 bg-emerald-50/30"
                        : isInProgress
                          ? "border-gray-300"
                          : "border-gray-200 opacity-75"
                    }`}
                    style={{
                      borderColor: isInProgress
                        ? `${folderColor}60`
                        : undefined,
                    }}
                  >
                    {/* Left indicator line for active quest */}
                    {isInProgress && (
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1.5"
                        style={{ backgroundColor: folderColor }}
                      />
                    )}

                    <div className="flex min-w-0 flex-1 items-start gap-4 sm:items-center">
                      {/* Status Icon */}
                      <div className="mt-0.5 shrink-0 sm:mt-0">
                        {isCompleted ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <CheckCircle2
                              size={20}
                              className="fill-emerald-100"
                            />
                          </div>
                        ) : isInProgress ? (
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-full shadow-sm"
                            style={{
                              backgroundColor: `${folderColor}15`,
                              color: folderColor,
                            }}
                          >
                            <Play
                              size={18}
                              className="ml-0.5"
                              fill="currentColor"
                            />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                            <Lock size={18} />
                          </div>
                        )}
                      </div>

                      {/* Quest Info */}
                      <div className="min-w-0 flex-1">
                        <h4
                          className={`truncate text-lg font-semibold ${isCompleted ? "text-gray-600 line-through" : "text-gray-900"}`}
                        >
                          {quest.name}
                        </h4>

                        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs font-medium">
                          {/* Status Badge */}
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 uppercase tracking-wide ${
                              isCompleted
                                ? "bg-emerald-100 text-emerald-700"
                                : isInProgress
                                  ? "text-white shadow-sm"
                                  : "bg-gray-100 text-gray-500"
                            }`}
                            style={{
                              backgroundColor: isInProgress
                                ? folderColor
                                : undefined,
                            }}
                          >
                            {isCompleted
                              ? "Selesai"
                              : isInProgress
                                ? "Sedang Jalan"
                                : "Terkunci"}
                          </span>

                          {/* Deadline / Time Info */}
                          {(quest.deadLineAt || quest.completedAt) && (
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2 py-1 text-gray-600">
                              <Clock size={12} />
                              {isCompleted
                                ? `Selesai: ${formatDeadline(quest.completedAt)}`
                                : quest.deadLineAt
                                  ? `Tenggat: ${formatDeadline(quest.deadLineAt)}`
                                  : "Tidak ada tenggat"}
                            </span>
                          )}

                          {/* EXP Reward */}
                          {quest.expReward && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-yellow-100 px-2 py-1 text-yellow-700">
                              <Zap size={12} className="fill-yellow-500" />
                              {quest.expReward} XP
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center justify-end gap-2 sm:pl-4">
                      {isInProgress && (
                        <button
                          onClick={() => handleCompleteQuest(quest.id)}
                          disabled={isPending}
                          className="rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                          style={{ backgroundColor: folderColor }}
                        >
                          {isPending ? (
                            <Loader2
                              size={16}
                              className="ml-2 animate-spin text-white"
                            />
                          ) : (
                            "Selesaikan"
                          )}
                        </button>
                      )}
                      <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <QuestReflectionModal
        isOpen={reflectionOpen}
        setIsOpen={setReflectionOpen}
        mode={"success"}
        questId={reflectionQuestId}
        questSuccessed={true}
      />
      <AddTaskDrawer
        open={questDrawerOpen}
        onClose={() => setQuestDrawerOpen(false)}
        folderId={folderId}
      />
    </>
  );
}
