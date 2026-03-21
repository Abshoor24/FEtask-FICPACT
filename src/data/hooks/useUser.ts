import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";

export const useUserProfile = () => {
	return useQuery({
		queryKey: ["user_profile"],
		queryFn: userService.getProfile,
		staleTime: 1000 * 60 * 3,
	});
};
