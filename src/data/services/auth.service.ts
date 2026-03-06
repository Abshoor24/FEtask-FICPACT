import { apiClient } from "@/common/libs/api-client";

class AuthService {
    // public async loginWithGoogle() {
    //     try {
    //         return await apiClient({
    //             url: "/auth/google",
    //             method: "GET",
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    public async checkSession(token: string | undefined) {
        try {
            return await apiClient({
                url: "/user/session",
                method: "GET",
                headers: {
                    Cookie: `token=${token}`,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export const authService = new AuthService();
