import { apiClient } from "@/common/libs/api-client";
import { SessionModel } from "../models/sessionModel";
import { UserModel } from "../models/userModel";

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

    public async getProfile() {
        return await apiClient<{ data: UserModel }>({
            url: "/user/profile",
            method: "GET",
        });
    }

    public async checkSession(token: string | undefined) {
        try {
            return await apiClient<{ data: SessionModel }>({
                url: "/user/session",
                method: "GET",
                headers: {
                    Cookie: `token=${token}`,
                },
            });
        } catch (error) {
            console.error("Session check failed:", error);
        }
    }

    public async logout() {
        return await apiClient({
            url: "/auth/logout",
            method: "DELETE",
        });
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
            },
        });
    }

    public async forgotPassword(email: string) {
        return await apiClient({
            url: "/auth/forgot-password",
            method: "POST",
            data: {
                email
            },
        });
    }

    public async resendVerificationToken() {
        return await apiClient({
            url: "/auth/resend-verification-code",
            method: "POST",
        });
    }

    public async resetPassword(token: string, email: string, newPassword: string) {
        return await apiClient({
            url: "/auth/reset-password",
            method: "POST",
            data: {
                token,
                email,
                password: newPassword
            },
        });
    }

    public async resendPhoneVerificationToken(phone: string) {
        return await apiClient({
            url: "/auth/resend-phone-verification",
            method: "POST",
            data: { phone },
        });
    }

    public async updatePhone(phone: string, token: string) {
        return await apiClient({
            url: "/auth/update-phone",
            method: "POST",
            data: { phone, token },
        });
    }
}

export const authService = new AuthService();
