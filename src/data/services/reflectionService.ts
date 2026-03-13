import { apiClient } from "@/common/libs/api-client";
import { CreateUserReflection, UserFailedReflection } from "@/data/models/reflectionModel";

class RefelectionService {
    public async createUserReflection(data: CreateUserReflection): Promise<{ data: CreateUserReflection } | null> {
        return await apiClient<{ data: CreateUserReflection }>({
            url: "/reflection/quest",
            method: "POST",
            data
        });
    }

    public async createUserFailed(data: UserFailedReflection): Promise<{ data: UserFailedReflection } | null> {
        return await apiClient<{ data: UserFailedReflection }>({
            url: "/reflection/create-failed",
            method: "POST",
            data
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
