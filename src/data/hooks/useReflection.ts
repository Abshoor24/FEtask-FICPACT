import {
  CreateUserReflectionSchema,
  UserFailedReflectionSchema,
} from "@/common/validations/reflectionValidation";
import { reflectionService } from "@/data/services/reflectionService";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetLatestReflection() {
  return useQuery({
    queryKey: ["latest_reflection"],
    queryFn: () => reflectionService.getLatestReflection(),
  });
}

export function useCreateUserReflection() {
  return useMutation({
    mutationKey: ["create_user_reflection"],
    mutationFn: (data: CreateUserReflectionSchema) =>
      reflectionService.createUserReflection(data),
  });
}

export function useCreateUserFailed() {
  return useMutation({
    mutationKey: ["create_user_failed"],
    mutationFn: (data: UserFailedReflectionSchema) =>
      reflectionService.createUserFailed(data),
  });
}

export function useCreateReflection() {
  return useMutation({
    mutationKey: ["create_reflection"],
    mutationFn: (notificationId: string) =>
      reflectionService.createReflection({ notificationId }),
  });
}
