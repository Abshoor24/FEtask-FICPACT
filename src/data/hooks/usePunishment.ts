import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { punishmentService } from "@/data/services/punishmentService";
import { CreatePunishment, UpdatePunishment } from "../models/punihsmentModel";

export function usePunishment(punishmentId: string) {
  return useQuery({
    queryKey: ["punishment", punishmentId],
    queryFn: () => punishmentService.getPunishment(punishmentId),
    enabled: !!punishmentId, // biar gak jalan kalau id kosong
  });
}

export function useCreatePunishment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePunishment) =>
      punishmentService.createPunishment(data),

    onSuccess: () => {
      // invalidate biar refetch data kalo punishment di caerate
      queryClient.invalidateQueries({ queryKey: ["punishment"] });
    },
  });
}

export function useUpdatePunishment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      punishmentId,
      data,
    }: {
      punishmentId: string;
      data: UpdatePunishment;
    }) => punishmentService.updatePunishment(punishmentId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["punishment", variables.punishmentId],
      });
    },
  });
}