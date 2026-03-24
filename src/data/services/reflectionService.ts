import { apiClient } from "@/common/libs/api-client";
import {
  CreateUserReflection,
  ReflectionModel,
  UserFailedReflection,
} from "@/data/models/reflectionModel";

class RefelectionService {
  public async getLatestReflection(): Promise<{
    data: ReflectionModel[];
  } | null> {
    return await apiClient<{ data: ReflectionModel[] }>({
      url: "/reflection/latest",
      method: "GET",
    });
  }

  public async createUserReflection(
    data: CreateUserReflection,
  ): Promise<{ data: CreateUserReflection } | null> {
    return await apiClient<{ data: CreateUserReflection }>({
      url: "/reflection/quest",
      method: "POST",
      data,
    });
  }

  public async createUserFailed(
    data: UserFailedReflection,
  ): Promise<{ data: UserFailedReflection } | null> {
    return await apiClient<{ data: UserFailedReflection }>({
      url: "/reflection/create-failed",
      method: "POST",
      data,
    });
  }

  public async createReflection() {
    return await apiClient<{ data: ReflectionModel }>({
      url: "/reflection/create-reflection",
      method: "POST",
    });
  }
  // public async createUserWeekly(): Promise<{data: UserWeeklyReflection[]}> {
  //     return await apiClient<{data: UserWeeklyReflection[]}>({
  //         url: "/reflection/weekly",
  //         method: "POST",
  //     });
  // }
}

export const reflectionService = new RefelectionService();
