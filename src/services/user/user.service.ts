import { IResponse } from "@/types/response.type"
import { ApiService } from "../api.service"
import { ICurrentUser, ILoginWithEmailDto } from "./user.dto"

export const UserService = {
    loginWithEmail: async (dto: ILoginWithEmailDto) => {
        const { data } = await ApiService.post<IResponse<ICurrentUser>>("/v1/auth/login-with-email", dto)
        return data.response
    },
    getLoggedInUser: async () => {
        const { data } = await ApiService.post<IResponse<ICurrentUser>>("/v1/user")
        return data
    },
}
