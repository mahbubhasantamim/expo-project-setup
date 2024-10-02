import notifee, { Event } from "@notifee/react-native"
import messaging from "@react-native-firebase/messaging"
import { useEffect } from "react"
import { PermissionsAndroid } from "react-native"

type TypeHandleClick = "HOME_SCREEN" | "NOTIFICATION_SCREEN"

// * 0. Register background handler (minimized,killed)
messaging().setBackgroundMessageHandler(async remoteMessage => {
    // create local notification here
    // console.log("setBackgroundMessageHandler")
    await onDisplayNotification(
        (remoteMessage?.data?.title as string) || "default title",
        (remoteMessage?.data?.body as string) || "default body",
        {
            fcmNotificationType: remoteMessage?.data?.fcmNotificationType as string,
        }
    )
})

export default function FCMConfigLayout() {
    // 1. ask permission
    useEffect(() => {
        //* 1. ask for notification permission: above android 33
        const checkPermission = async () => {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
        }
        // eslint-disable-next-line no-void
        void checkPermission()

        // 2. get the token whenever i need using FCMUtil->getToken function
        // const getToken = async () => {
        //     await messaging().registerDeviceForRemoteMessages() // required for ios, no problem in android
        //     const token = await messaging().getToken()
        //     console.log({ token })
        // }
        // // eslint-disable-next-line no-void
        // void getToken()

        // * 3. foreground message
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // console.log("messaging().onMessage(")
            await onDisplayNotification(
                (remoteMessage?.data?.title as string) || "default title",
                (remoteMessage?.data?.body as string) || "default body",
                {
                    fcmNotificationType: remoteMessage?.data?.fcmNotificationType as string,
                }
            )
            // Alert.alert("Foreground", JSON.stringify(remoteMessage))
        })

        return unsubscribe
    }, [])

    // eslint-disable-next-line react/react-in-jsx-scope
    return <></>
}

// when app is closed and clicked on notification
notifee.onBackgroundEvent(async ({ detail }: Event) => {
    const { pressAction } = detail
    handleOnClick(pressAction?.id as TypeHandleClick | undefined)
})

// when app is open and clicked on notification
notifee.onForegroundEvent(async ({ detail }: Event) => {
    const { pressAction } = detail
    handleOnClick(pressAction?.id as TypeHandleClick | undefined)
})

function handleOnClick(pressActionId: TypeHandleClick = "HOME_SCREEN") {
    if (pressActionId === "HOME_SCREEN") {
        // todo: send to home screen
    } else {
        // todo: send to notification screen
    }
}

async function onDisplayNotification(title: string, body: string, extra?: { fcmNotificationType?: string }) {
    try {
        // Request permissions (required for iOS)
        await notifee.requestPermission()

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: "gl-tech-default",
            name: "gl-tech default channel",
        })

        // Display a notification
        await notifee.displayNotification({
            title,
            body: body,
            android: {
                channelId,
                // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: extra ? extra.fcmNotificationType || "default" : "default",
                },
            },
        })
    } catch (error) {
        console.error("onDisplayNotification-> ", error)
    }
}
