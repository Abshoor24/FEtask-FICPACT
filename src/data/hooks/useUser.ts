import { useMutation, useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user_profile"],
    queryFn: userService.getProfile,
    staleTime: 1000 * 60 * 3,
  });
};

export const useIsFirstReflection = () => {
  return useQuery({
    queryKey: ["is_first_reflection"],
    queryFn: userService.isFirstReflection,
    staleTime: 1000 * 60 * 3,
  });
};
export const useUpdateReflectionTime = () => {
  return useMutation({
    mutationFn: ({ days, hours }: { days: number; hours: number }) =>
      userService.updateReflectionTime(days, hours),
  });
};
