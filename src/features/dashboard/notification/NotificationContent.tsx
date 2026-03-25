"use client";

import React, { useState } from "react";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Zap,
  XCircle,
  Filter,
  ChevronRight,
} from "lucide-react";
import { useGetAllNotifications, useMarkNotificationAsRead } from "@/data/hooks/useNotification";
import type { NotificationModel, NotificationType } from "@/data/models/notificationModel";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const typeConfig: Record<
  NotificationType,
  { label: string; icon: React.ElementType; color: string; bg: string; border: string }
> = {
  QUEST_COMPLETED: {
    label: "Quest Completed",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  QUEST_FAILED: {
    label: "Quest Failed",
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  REFLECTION_TRIGGER: {
    label: "Reflection",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  PUNISHMENT_REQUIRED: {
    label: "Punishment",
    icon: AlertTriangle,
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  STREAK_LOST: {
    label: "Streak Lost",
    icon: Flame,
    color: "text-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
};

type FilterTab = "all" | "unread" | "read";

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NotificationContent() {
  const router = useRouter();
  const { data, isLoading } = useGetAllNotifications();
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const notifications = data?.data;

  const filteredNotifications: NotificationModel[] = (() => {
    if (!notifications) return [];
    switch (activeTab) {
      case "unread":
        return notifications.unread;
      case "read":
        return notifications.readed;
      default:
        return notifications.all;
    }
  })();

  const unreadCount = notifications?.unread?.length ?? 0;

  const handleNotificationClick = (notification: NotificationModel) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    router.push(`/dashboard/notification/${notification.id}`);
  };

  const tabs: { key: FilterTab; label: string; count?: number }[] = [
    { key: "all", label: "Semua", count: notifications?.all?.length },
    { key: "unread", label: "Belum Dibaca", count: unreadCount },
    { key: "read", label: "Sudah Dibaca", count: notifications?.readed?.length },
  ];

  return (
    <div className="flex flex-col w-full h-full justify-start overflow-y-auto px-10 py-8 gap-5">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#7C3BED]/10">
            <Bell size={22} className="text-[#7C3BED]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifikasi</h1>
            <p className="text-sm text-gray-500">
              {unreadCount > 0
                ? `Kamu punya ${unreadCount} notifikasi belum dibaca`
                : "Semua notifikasi sudah dibaca"}
            </p>
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === tab.key
                ? "bg-[#7C3BED] text-white shadow-md shadow-[#7C3BED]/25"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={clsx(
                  "text-xs px-2 py-0.5 rounded-full font-semibold",
                  activeTab === tab.key
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* NOTIFICATION LIST */}
      <div className="space-y-3">
        {isLoading ? (
          // Skeleton Loading
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 border border-gray-100 animate-pulse"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                <div className="flex-1">
                  <div className="h-4 w-32 bg-gray-100 rounded mb-2" />
                  <div className="h-3 w-full bg-gray-100 rounded mb-1" />
                  <div className="h-3 w-2/3 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          ))
        ) : filteredNotifications.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="p-4 rounded-2xl bg-gray-50 mb-4">
              <Bell size={40} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Tidak ada notifikasi
            </h3>
            <p className="text-sm text-gray-500">
              {activeTab === "unread"
                ? "Semua notifikasi sudah dibaca 🎉"
                : "Belum ada notifikasi masuk"}
            </p>
          </div>
        ) : (
          filteredNotifications
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .map((notification) => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;

              return (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={clsx(
                    "w-full text-left rounded-xl p-5 border transition-all group",
                    "hover:shadow-md hover:border-[#7C3BED]/30 hover:-translate-y-0.5",
                    notification.isRead
                      ? "bg-white border-gray-100"
                      : "bg-gradient-to-r from-[#7C3BED]/[0.03] to-transparent border-[#7C3BED]/15"
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={clsx(
                        "p-2.5 rounded-lg shrink-0",
                        config.bg
                      )}
                    >
                      <Icon size={18} className={config.color} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={clsx(
                            "text-xs font-semibold px-2 py-0.5 rounded-full",
                            config.bg,
                            config.color
                          )}
                        >
                          {config.label}
                        </span>
                        {!notification.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#7C3BED] animate-pulse" />
                        )}
                      </div>

                      <h3
                        className={clsx(
                          "text-sm font-semibold mb-0.5 truncate",
                          notification.isRead ? "text-gray-700" : "text-gray-900"
                        )}
                      >
                        {notification.title || "Notifikasi"}
                      </h3>

                      <p className="text-sm text-gray-500 line-clamp-2">
                        {notification.message || "—"}
                      </p>

                      <p className="text-xs text-gray-400 mt-2">
                        {formatRelativeTime(notification.createdAt)}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight
                      size={18}
                      className="text-gray-300 group-hover:text-[#7C3BED] transition shrink-0 mt-1"
                    />
                  </div>
                </button>
              );
            })
        )}
      </div>
    </div>
  );
}
