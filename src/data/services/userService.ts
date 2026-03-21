import { apiClient } from "@/common/libs/api-client";
import { UserModel } from "../models/userModel";

class UserService {
	public async getProfile() {
		return await apiClient<{ data: UserModel }>({
			url: "/user/profile",
			method: "GET",
		});
	}

}

export const userService = new UserService()
