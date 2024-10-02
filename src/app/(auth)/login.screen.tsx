import MyButton from "@/components/form/my-button"
import { MyInput } from "@/components/form/my-input"
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout"
import { ImageConstant } from "@/constants/image.constant"
import React from "react"
import { Image, Text, View } from "react-native"

export default function LoginScreen() {
    return (
        <MyScreenWrapperLayout scrollView className="flex-1 p-4">
            <View className="h-20"></View>
            <Image source={ImageConstant.LOGIN_BANNER} className="w-full h-96" resizeMode="contain" />
            <View className="h-4"></View>
            <Text className="text-body text-center text-gray-600">Welcome To</Text>
            <Text className="text-h2 text-center text-green-500">Green Light</Text>
            <View className="h-4"></View>

            <MyInput label="Name" />

            <View className="h-4"></View>
            <MyButton title="Login" onPress={() => {}} fullWidth />
            <View className="h-4"></View>
        </MyScreenWrapperLayout>
    )
}
