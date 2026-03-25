import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/data/services/notificationService";

export function useGetAllNotifications() {
  return useQuery({
    queryKey: ["get_all_notifications"],
    queryFn: () => notificationService.getAllNotifications(),
  });
}

export function useGetNotificationById(id: string) {
  return useQuery({
    queryKey: ["get_notification", id],
    queryFn: () => notificationService.getNotificationById(id),
    enabled: !!id,
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["mark_notification_as_read"],
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_notifications"] });
    },
  });
}
