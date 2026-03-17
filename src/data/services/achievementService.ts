import { apiClient } from "@/common/libs/api-client";
import { AchievementProgressResponse } from "../models/achievementModel";

class AchievementService {
    async getUserAchievements() {
        return await apiClient<{ data: AchievementProgressResponse }>({
            url: "/achievements/user",
            method: "GET",
        })
    }
}

export const achievementService = new AchievementService()