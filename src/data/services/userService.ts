import { apiClient } from "@/common/libs/api-client";
import { UserProfileApiResponse } from "../models/userModel";

class UserService {
	public async getProfile() {
		return await apiClient<UserProfileApiResponse>({
			url: "/user/profile",
			method: "GET",
		});
	}

}

export const userService = new UserService()
