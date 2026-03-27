"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Zap,
  XCircle,
  Loader2,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import {
  useGetNotificationById,
  useMarkNotificationAsRead,
} from "@/data/hooks/useNotification";
import { useCreateReflection } from "@/data/hooks/useReflection";
import type { NotificationType } from "@/data/models/notificationModel";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import toast from "react-hot-toast";
import QuestReflectionModal from "@/components/QuestReflectionModal";
import { UpdatePunishmentModal } from "@/components/modals/UpdatePunishmentModal";

const typeConfig: Record<
  NotificationType,
  {
    label: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    gradient: string;
  }
> = {
  QUEST_COMPLETED: {
    label: "Quest Completed",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    gradient: "from-emerald-500 to-green-600",
  },
  QUEST_FAILED: {
    label: "Quest Failed",
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-50",
    gradient: "from-red-500 to-rose-600",
  },
  REFLECTION_TRIGGER: {
    label: "Reflection Time",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-50",
    gradient: "from-amber-500 to-yellow-600",
  },
  PUNISHMENT_REQUIRED: {
    label: "Punishment Required",
    icon: AlertTriangle,
    color: "text-orange-500",
    bg: "bg-orange-50",
    gradient: "from-orange-500 to-red-500",
  },
  STREAK_LOST: {
    label: "Streak Lost",
    icon: Flame,
    color: "text-rose-500",
    bg: "bg-rose-50",
    gradient: "from-rose-500 to-pink-600",
  },
};

function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface NotificationDetailContentProps {
  notificationId: string;
}

export default function NotificationDetailContent({
  notificationId,
}: NotificationDetailContentProps) {
  const router = useRouter();
  const { data, isLoading } = useGetNotificationById(notificationId);
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { mutate: createReflection, isPending: isCreatingReflection } =
    useCreateReflection();

  const [punishmentModalOpen, setPunishmentModalOpen] =
    useState<boolean>(false);
  const [questReflectionModalOpen, setQuestReflectionModalOpen] =
    useState(false);

  const notification = data?.data;
  const hasMarkedAsRead = useRef(false);

  // Mark as read when detail is opened (only once)
  useEffect(() => {
    if (!notification) return;

    if (!notification.isRead && !hasMarkedAsRead.current) {
      hasMarkedAsRead.current = true;
      markAsRead(notificationId);
    }
  }, [notification]);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-full justify-start overflow-y-auto px-10 py-8 gap-5">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-lg" />
            <div className="h-5 w-32 bg-gray-200 rounded" />
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="h-12 w-12 bg-gray-200 rounded-xl mb-4" />
            <div className="h-6 w-64 bg-gray-200 rounded mb-3" />
            <div className="h-4 w-full bg-gray-200 rounded mb-2" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center gap-4">
        <div className="p-4 rounded-2xl bg-gray-50">
          <Bell size={40} className="text-gray-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Notifikasi tidak ditemukan
        </h3>
        <button
          onClick={() => router.push("/dashboard/notification")}
          className="text-sm text-[#7C3BED] font-medium hover:underline"
        >
          Kembali ke daftar notifikasi
        </button>
      </div>
    );
  }

  const config = typeConfig[notification.type];
  const Icon = config.icon;

  const handleCreateReflection = () => {
    createReflection(notificationId, {
      onSuccess: () => {
        toast.success("Refleksi berhasil dibuat! 🎉");
        router.push("/dashboard/notification");
      },
      onError: (error) => {
        toast.error(error.message || "Gagal membuat refleksi");
      },
    });
  };

  const handleOpenPunishmentModal = () => {
    setPunishmentModalOpen(true);
    // TODO: Implement punishment modal
  };

  return (
    <>
      <QuestReflectionModal
        isOpen={questReflectionModalOpen}
        setIsOpen={setQuestReflectionModalOpen}
        mode={"failed"}
        questId={notification?.data?.questId || ""}
        questSuccessed={false}
        notificationId={notification?.id}
      />
      <UpdatePunishmentModal
        punishmentModalOpen={punishmentModalOpen}
        onClose={() => setPunishmentModalOpen(false)}
        punishmentId={notification?.data?.questId || ""}
        questName={notification?.data?.questName || ""}
        notificationId={notification?.id}
      />
      <div className="flex flex-col w-full h-full justify-start overflow-y-auto px-10 py-8 gap-6">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard/notification")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#7C3BED] transition w-fit group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Kembali ke notifikasi
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header Banner */}
          <div className={clsx("bg-gradient-to-r p-6", config.gradient)}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                <Icon size={22} className="text-white" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                  {config.label}
                </span>
                <h1 className="text-xl font-bold text-white mt-0.5">
                  {notification.title || "Notifikasi"}
                </h1>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Message */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Pesan
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px]">
                {notification.message || "Tidak ada pesan tambahan."}
              </p>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50">
                <span className="text-gray-400">Waktu:</span>
                <span className="text-gray-700 font-medium">
                  {formatDateTime(notification.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50">
                <span className="text-gray-400">Status:</span>
                <span
                  className={clsx(
                    "font-medium",
                    notification.isRead ? "text-emerald-600" : "text-amber-500",
                  )}
                >
                  {notification.isRead ? "Sudah dibaca" : "Belum dibaca"}
                </span>
              </div>
            </div>

            {/* Additional Data */}
            {notification.data && Object.keys(notification.data).length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Detail Tambahan
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  {Object.entries(notification.data).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-gray-800 font-medium">
                        {typeof value === "object"
                          ? JSON.stringify(value)
                          : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== TYPE-SPECIFIC ACTIONS ===== */}

            {/* REFLECTION_TRIGGER CTA */}
            {notification.type === "REFLECTION_TRIGGER" && (
              <div className="mt-4 p-5 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-amber-100">
                    <Sparkles size={18} className="text-amber-600" />
                  </div>
                  {notification.status === "DONE" ? (
                    <div>
                      <h4 className="text-sm font-bold text-amber-800">
                        Kamu sudah melakukan refleksi! ✨
                      </h4>
                      <p className="text-sm text-amber-700 mt-1">
                        Kunjungi ke halaman profil untuk melihat hasil refleksi
                        Kamu
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-sm font-bold text-amber-800">
                        Saatnya Refleksi! ✨
                      </h4>
                      <p className="text-sm text-amber-700 mt-1">
                        Luangkan waktu sejenak untuk merefleksikan progress
                        quest kamu. Refleksi membantu kamu memahami pola dan
                        meningkatkan produktivitas.
                      </p>
                    </div>
                  )}
                </div>
                {notification.status === "PENDING" ? (
                  <button
                    onClick={handleCreateReflection}
                    disabled={isCreatingReflection}
                    className={clsx(
                      "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all",
                      "bg-gradient-to-r from-amber-500 to-yellow-500 text-white",
                      "hover:from-amber-600 hover:to-yellow-600 hover:shadow-lg hover:shadow-amber-500/25",
                      "active:scale-[0.98]",
                      isCreatingReflection && "opacity-60 cursor-not-allowed",
                    )}
                  >
                    {isCreatingReflection ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Membuat refleksi...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        Mulai Refleksi Sekarang
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    disabled={notification.status === "DONE"}
                    className={clsx(
                      "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all",
                      "bg-gradient-to-r from-amber-500 to-yellow-500 text-white",
                      "active:scale-[0.98]",
                      isCreatingReflection && "opacity-60 cursor-not-allowed",
                    )}
                  >
                    Kamu Sudah melakukan refleksi
                  </button>
                )}
              </div>
            )}

            {/* PUNISHMENT_REQUIRED CTA */}
            {notification.type === "PUNISHMENT_REQUIRED" && (
              <div className="mt-4 p-5 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <ShieldAlert size={18} className="text-orange-600" />
                  </div>
                  {notification.status === "DONE" ? (
                    <div>
                      <h4 className="text-sm font-bold text-orange-800">
                        Punishment Diperbarui ✅
                      </h4>
                      <p className="text-sm text-orange-700 mt-1">
                        Kamu telah memperbarui status punishment ini. Klik
                        tombol dibawah untuk melihat detail!
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-sm font-bold text-orange-800">
                        Punishment Menunggu! ⚠️
                      </h4>
                      <p className="text-sm text-orange-700 mt-1">
                        Kamu memiliki punishment yang harus diselesaikan. Buka
                        detail punishment untuk melihat apa yang perlu kamu
                        lakukan.
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleOpenPunishmentModal}
                  className={clsx(
                    "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all",
                    "bg-gradient-to-r from-orange-500 to-red-500 text-white",
                    "hover:from-orange-600 hover:to-red-600 hover:shadow-lg hover:shadow-orange-500/25",
                    "active:scale-[0.98]",
                  )}
                >
                  <ShieldAlert size={16} />
                  Lihat Punishment
                </button>
              </div>
            )}

            {/* QUEST_FAILED info */}
            {notification.type === "QUEST_FAILED" && (
              <div className="flex items-center justify-between mt-4 p-5 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-100">
                    <XCircle size={18} className="text-red-500" />
                  </div>
                  <div className="">
                    <h4 className="text-sm font-bold text-red-800">
                      Quest Gagal 😔
                    </h4>
                    <p className="text-sm text-red-700 mt-1">
                      Jangan menyerah! Evaluasi apa yang bisa diperbaiki dan
                      coba lagi.
                    </p>
                  </div>
                </div>
                {notification.status === "PENDING" ? (
                  <button
                    onClick={() => setQuestReflectionModalOpen(true)}
                    className={clsx(
                      "w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all",
                      "bg-linear-to-r from-red-500 to-red-700 text-white",
                      "hover:from-red-500 hover:to-red-400 hover:shadow-lg hover:shadow-amber-500/25",
                      "active:scale-[0.98]",
                    )}
                  >
                    Refleksi Sekarang!!
                  </button>
                ) : null}
              </div>
            )}

            {/* STREAK_LOST info */}
            {notification.type === "STREAK_LOST" && (
              <div className="mt-4 p-5 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-rose-100">
                    <Flame size={18} className="text-rose-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-rose-800">
                      Streak Terputus 🔥
                    </h4>
                    <p className="text-sm text-rose-700 mt-1">
                      Streak kamu terputus. Ayo bangun kembali streak-mu dari
                      sekarang!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Punishment Modal Placeholder */}
      </div>
    </>
  );
}
