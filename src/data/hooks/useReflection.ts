import { CreateUserReflectionSchema, UserFailedReflectionSchema } from "@/common/validations/reflectionValidation";
import { reflectionService } from "@/services/reflectionService";
import { useMutation } from "@tanstack/react-query";

export function useCreateUserReflection() {
    return useMutation({
        mutationKey: ["create_user_reflection"],
        mutationFn: (data: CreateUserReflectionSchema) => reflectionService.createUserReflection(data),
    })
}

export function useCreateUserFailed() {
    return useMutation({
        mutationKey: ["create_user_failed"],
        mutationFn: (data: UserFailedReflectionSchema) => reflectionService.createUserFailed(data),
    })
}