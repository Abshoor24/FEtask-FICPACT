import { useQuery } from "@tanstack/react-query";
import { leaderboardService } from "@/data/services/leaderboardService";

export function useWeeklyLeaderboard() {
  return useQuery({
    queryFn: () => leaderboardService.getWeeklyLeaderboard(),
    queryKey: ["get_weekly_leaderboard"],
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
}

export function useMonthlyLeaderboard() {
  return useQuery({
    queryFn: () => leaderboardService.getMonthlyLeaderboard(),
    queryKey: ["get_monthly_leaderboard"],
    staleTime: 5 * 60 * 1000,
  });
}

export function useLeaderboardAllTime() {
  return useQuery({
    queryFn: () => leaderboardService.getLeaderboardAllTime(),
    queryKey: ["get_all_time_leaderboard"],
    staleTime: 5 * 60 * 1000,
  });
}
