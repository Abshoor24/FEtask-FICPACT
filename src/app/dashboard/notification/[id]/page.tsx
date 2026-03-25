"use client";

import NotificationDetailContent from "@/features/dashboard/notification/NotificationDetailContent";
import { useParams } from "next/navigation";

export default function NotificationDetailPage() {
  const params = useParams();
  const notificationId = params.id as string;

  return <NotificationDetailContent notificationId={notificationId} />;
}
