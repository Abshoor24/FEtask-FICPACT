import { useMutation, useQuery } from "@tanstack/react-query";
import { questService } from "@/services/questService";
import { CreateQuestSchema } from "@/common/validations/questValidation";
import { AIMode } from "@/components/VoiceCommand/types";

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
export function useUpdateCompletedQuest() {
    return useMutation({
        mutationFn: (questId: string) => questService.updateCompletedQuest(questId),
        mutationKey: ["update_completed_quest"],
    })
}


export function useCreateQuestWithVoice() {
    return useMutation({
        mutationFn: (data: { text: string; mode: AIMode }) => questService.createWithVoiceCommand(data.text, data.mode),
        mutationKey: ["create_quest_with_voice"],
    })
}
