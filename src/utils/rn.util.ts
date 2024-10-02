import * as WebBrowser from "expo-web-browser"
import { Dimensions } from "react-native"
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification"

export const RnUtils = {
    getDeviceHeight: () => {
        return Dimensions.get("window").height
    },
    getDeviceWidth: () => {
        return Dimensions.get("window").width
    },
    getShadowStyle: () => {
        return {
            // shadowColor: TailwindTheme.colors.gray[600],
            elevation: 1.2,
        }
    },
    toast: (title: string, description: string, type: ALERT_TYPE) => {
        Toast.show({ type, title, textBody: description })
    },
    alert: (title: string, description: string, type: ALERT_TYPE, buttonTitle = "Ok") => {
        Dialog.show({
            type,
            title,
            textBody: description,
            button: buttonTitle,
        })
    },
    openLink: async (url: string) => {
        try {
            await WebBrowser.openBrowserAsync(url)
        } catch (error) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: "Error",
                textBody: `Don't know how to open this URL: ${url}`,
                button: "Ok",
            })
        }
    },
    fakeAwait: (delay = 1000) => {
        return new Promise(resolve => setTimeout(resolve, delay))
    },
}
