import { EnvConfig } from "@/config/env.config"
import { useUserStore } from "@/hooks/user.store"
import { IErrorResponse } from "@/types/response.type"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { MessageConstant } from "../constants/message.constant"

export const ApiService = axios.create({
    baseURL: EnvConfig.API_URL,
    withCredentials: true,
    timeout: 60000,
    timeoutErrorMessage: MessageConstant.SLOW_INTERNET,
})

ApiService.interceptors.request.use(
    async config => {
        const idToken = useUserStore.getState()?.user?.idToken
        if (idToken) {
            config.headers.Authorization = `Bearer ${idToken}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// generate new tokens interceptor
ApiService.interceptors.response.use(
    result => result,
    async (error: AxiosError) => {
        const originalRequest = error.config as { sent: true } & AxiosRequestConfig
        const response = error.response as AxiosResponse<IErrorResponse, unknown>
        if (response?.status === 401 && !originalRequest.sent) {
            // logout the user here
            useUserStore.getState().logout()
        }
        throw error
    }
)
