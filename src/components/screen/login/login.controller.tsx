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
            setCurrentUser(userResponse)
            RnUtils.toast("successfully login", "", ALERT_TYPE.SUCCESS)
        } catch (error) {
            console.error("login with email:onSubmit:->", error)
            const message = ErrorUtil.getErrorMessage(error as Error).message
            RnUtils.toast(message, "", ALERT_TYPE.DANGER)
        }
    }

    return {
        control,
        handleSubmit: handleSubmit(onSubmit),
        isSubmitting,
    }
}
