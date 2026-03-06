import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

// export function useLoginGoole() {
//     return useMutation({
//         mutationKey: ["auth_google"],
//         mutationFn: authService.loginWithGoogle,
//     })
// }
 export function useCheckSession() {
    return useMutation({
        mutationKey: ["check_session"],
        mutationFn: authService.checkSession,
    })
}