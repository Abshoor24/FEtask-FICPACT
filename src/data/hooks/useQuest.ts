import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateQuestRequest } from "../models/questModel";
import { questService } from "@/services/questService";
import { CreateQuestSchema } from "@/common/validations/questValidation";

export function useCreateQuest() {
    return useMutation({
        mutationFn: (data: CreateQuestSchema) => questService.create({ ...data, title: data.name, deadline: data.deadLineAt }),
        mutationKey: ["create_quest"],
    })
}

export function useGetUserQuests() {
    return useQuery({
        queryFn: () => questService.getAll(),
        queryKey: ["get_user_quests"],
        staleTime: 1000,
    })
}