import { IUser } from "@/services/user/user.dto"
import { revokeAsync } from "expo-auth-session"

export const LoginUtil = {
    logoutFn: async (user: IUser, logout: () => void) => {
        const revokeResponse = await revokeAsync(
            {
                clientId: user?.school.ClientId,
                token: user?.refreshToken,
            },
            {
                revocationEndpoint: user?.school.UserPoolDomain + "/oauth2/revoke",
            }
        )
        if (revokeResponse) {
            logout()
        }
    },
}
