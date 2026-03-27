import { apiClient } from "@/common/libs/api-client";
import { UserProfileApiResponse } from "../models/userModel";

class UserService {
  public async getProfile() {
    return await apiClient<UserProfileApiResponse>({
      url: "/user/profile",
      method: "GET",
    });
  }

  public async isFirstReflection() {
    return await apiClient<{
      data: { status: boolean; notificationId: string };
    }>({
      url: "/user/is-first-reflection",
      method: "GET",
    });
  }

  public async updateReflectionTime(days: number, hours: number) {
    return await apiClient({
      url: "/user/reflection-time",
      method: "PATCH",
      data: { days, hours },
    });
  }
}

export const userService = new UserService();
