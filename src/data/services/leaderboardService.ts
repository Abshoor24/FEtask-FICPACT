import { apiClient } from "@/common/libs/api-client";
import type { LeaderboardModel } from "../models/leaderboardModel";

class LeaderboardService {
    public async getWeeklyLeaderboard() {
        return await apiClient<{ data: LeaderboardModel[] }>({
            url: "/leaderboards/weekly",
            method: "GET",
        });
    }

    public async getMonthlyLeaderboard() {
        return await apiClient<{ data: LeaderboardModel[] }>({
            url: "/leaderboards/monthly",
            method: "GET",
        });
    }

    public async getLeaderboardAllTime() {
        return await apiClient<{ data: LeaderboardModel[] }>({
            url: "/leaderboards/all-time",
            method: "GET",
        });
    }
}

export const leaderboardService = new LeaderboardService();