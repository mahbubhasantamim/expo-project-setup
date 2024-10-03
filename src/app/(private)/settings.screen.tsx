import MyButton from "@/components/form/my-button"
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout"
import { useLoginController } from "@/components/screen/login/login.controller"
import { useUserStore } from "@/hooks/user.store"
import React, { useState } from "react"
import { Text, View } from "react-native"

export default function SettignsScreen() {
    const user = useUserStore(s => s.user)
    const { logoutUser } = useLoginController()
    const [loading, setLoading] = useState(false)

    return (
        <MyScreenWrapperLayout scrollView className="flex-1 p-4 w-full md:w-3/4 lg:w-2/4 mx-auto">
            <View className="h-20"></View>
            <Text className="text-body text-center text-gray-600 text-2xl">Settings page</Text>
            <View className="h-20"></View>

            <Text>
                User ID: <Text className="font-bold">{user?.id}</Text>
            </Text>
            <Text>
                User Name: <Text className="font-bold">{user?.fullName}</Text>
            </Text>
            <View className="h-10"></View>
            <MyButton
                title="Logout"
                onPress={async () => {
                    try {
                        setLoading(true)
                        await logoutUser()
                        setLoading(false)
                    } catch (error) {
                        console.log(error)

                        setLoading(false)
                    }
                }}
                loading={loading}
            />
        </MyScreenWrapperLayout>
    )
}
