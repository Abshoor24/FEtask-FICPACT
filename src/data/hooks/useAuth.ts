import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginSchema, RegisterSchema } from "@/common/validations/authValidation";
import { authService } from "../services/authService";

// export function useLoginGoole() {
//     return useMutation({
//         mutationKey: ["auth_google"],
//         mutationFn: authService.loginWithGoogle,
//     })
// }

export const useGetProfile = () => {
    return useQuery({
        queryKey: ["get_profile"],
        queryFn: authService.getProfile,
    })
}

export function useCheckSession() {
    return useMutation({
        mutationKey: ["check_session"],
        mutationFn: authService.checkSession,
    })
}


export function useLogin() {
    return useMutation({
        mutationKey: ["auth_login"],
        mutationFn: (data: LoginSchema) => authService.login(data.email, data.password),
    })
}

export function useRegister() {
    return useMutation({
        mutationKey: ["auth_register"],
        mutationFn: (data: RegisterSchema) => authService.register(data.name, data.email, data.password),
    })
}

export function useVerifyAccount() {
    return useMutation({
        mutationKey: ["verify_account"],
        mutationFn: (token: string) => authService.verifyAccount(token),
    })
}

export function useForgotPassword() {
    return useMutation({
        mutationKey: ["forgot_password"],
        mutationFn: (email: string) => authService.forgotPassword(email),
    })
}

export function useResendVerificationToken() {
    return useMutation({
        mutationKey: ["resend_verification_token"],
        mutationFn: () => authService.resendVerificationToken(),
    })
}

export function useLogout() {
    return useMutation({
        mutationKey: ["auth_logout"],
        mutationFn: () => authService.logout(),
        // onSuccess: () => {
        //     localStorage.removeItem("token");
        //     window.location.href = "/";
        //     alert("Logout successful");
        // }
    })
}

export function useResetPassword() {
    return useMutation({
        mutationKey: ["reset_password"],
        mutationFn: ({ token, email, newPassword }: { token: string; email: string; newPassword: string }) => authService.resetPassword(token, email, newPassword),
    })
}
