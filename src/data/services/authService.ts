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

    public async checkSession(token: string | undefined)  {
        try {
            return await apiClient<{data: SessionModel}>({
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

    public async login(email: string, password: string) {
            return await apiClient({
                url: "/auth/login",
                method: "POST",
                data: { email, password },
            });
  
    }

    public async register(name: string, email: string, password: string) {
            return await apiClient({
                url: "/auth/register",
                method: "POST",
                data: { name, email, password },
            });
    }

    public async verifyAccount(token: string) {
        return await apiClient({
            url: "/auth/verify-account",
            method: "POST",
            data: {
                token
            } ,
        });
    }

    public async resendVerificationToken() {
        return await apiClient({
            url: "/auth/resend-verification-code",
            method: "POST",
        });
    }
}

export const authService = new AuthService();
