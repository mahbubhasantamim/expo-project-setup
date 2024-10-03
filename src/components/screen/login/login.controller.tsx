import { QUERY_KEYS, queryClient } from "@/config/query.config"
import { useUserStore } from "@/hooks/user.store"
import { ILoginWithEmailDto, LoginWithEmailDto } from "@/services/user/user.dto"
import { UserService } from "@/services/user/user.service"
import { ErrorUtil } from "@/utils/error.util"
import { RnUtils } from "@/utils/rn.util"
import { zodResolver } from "@hookform/resolvers/zod"
import * as WebBrowser from "expo-web-browser"
import { useForm } from "react-hook-form"
import { ALERT_TYPE } from "react-native-alert-notification"

// this is not route because not export default

WebBrowser.maybeCompleteAuthSession()

export function useLoginController() {
    const setCurrentUser = useUserStore(s => s.setCurrentUser)
    const logout = useUserStore(s => s.logout)

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ILoginWithEmailDto>({
        resolver: zodResolver(LoginWithEmailDto),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (input: ILoginWithEmailDto) => {
        try {
            const userResponse = await UserService.loginWithEmail(input)
            if (userResponse.id) {
                const data = await UserService.getLoggedInUser()
                setCurrentUser(data.response)
            }
            RnUtils.toast("Success", "successfully login", ALERT_TYPE.SUCCESS)
        } catch (error) {
            console.error("login with email:onSubmit:->", error)
            const message = ErrorUtil.getErrorMessage(error as Error).message
            RnUtils.toast(message, "", ALERT_TYPE.DANGER)
        }
    }
    const logoutUser = async () => {
        try {
            await UserService.logoutUser()
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER], type: "all" }),
            ])
            logout()
            queryClient.clear()
        } catch (error) {
            console.log(error)
            const errorObject = ErrorUtil.getErrorMessage(error as Error)
            const message = errorObject?.message
            RnUtils.toast(message, "", ALERT_TYPE.DANGER)
        }
    }

    return {
        control,
        handleSubmit: handleSubmit(onSubmit),
        isSubmitting,
        logoutUser,
    }
}
