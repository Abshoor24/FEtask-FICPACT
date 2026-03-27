import { apiClient } from "@/common/libs/api-client";
import {
  CreatePunishment,
  Punishment,
  UpdatePunishment,
} from "../models/punihsmentModel";

class PunishmentService {
  async getPunishment(punishmentId: string) {
    return apiClient<{ data: Punishment }>({
      url: `/punishments/${punishmentId}/quest`,
      method: "GET",
    });
  }

  async createPunishment(data: CreatePunishment) {
    return apiClient<{ data: Punishment }>({
      url: `/punishments`,
      method: "POST",
      data,
    });
  }

  async updatePunishment(punishmentId: string, data: UpdatePunishment) {
    return apiClient<{ data: Punishment }>({
      url: `/punishments/${punishmentId}/status`,
      method: "PATCH",
      data,
    });
  }
}

export const punishmentService = new PunishmentService();
