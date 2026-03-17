import { useMutation, useQuery } from "@tanstack/react-query"
import { achievementService } from "../services/achievementService"

export const useGetUserAchievements = () => {
    return useQuery({
        queryKey: ["userAchievements"],
        queryFn: achievementService.getUserAchievements,
        staleTime: 1000 * 60 * 5,
    })
}

export const useClaimAchievement = () => {
    return useMutation({
        mutationKey: ["claimAchievement"],
        mutationFn: (achievementId: string) => achievementService.claimAchievement(achievementId),
    })
}