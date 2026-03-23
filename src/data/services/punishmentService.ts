import { apiClient } from "@/common/libs/api-client";
import { CreatePunishment, UpdatePunishment } from "../models/punihsmentModel";

class PunishmentService {
  async getPunishment(punishmentId: string) {
    return apiClient({
      url: `/punishments/${punishmentId}/quest`,
      method: "GET",
    });
  }

  async createPunishment(data: CreatePunishment) {
    return apiClient({
      url: `/punishments`,
      method: "POST",
      data,
    });
  }

  async updatePunishment(punishmentId: string, data: UpdatePunishment) {
    return apiClient({
      url: `/punishments/${punishmentId}`,
      method: "PATCH", 
      data,
    });
  }
}

export const punishmentService = new PunishmentService();