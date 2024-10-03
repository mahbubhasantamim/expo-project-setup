import MyButton from "@/components/form/my-button"
import MyInputWithRHF from "@/components/form/my-input"
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout"
import { useLoginController } from "@/components/screen/login/login.controller"
import React from "react"
import { Text, View } from "react-native"

export default function LoginScreen() {
    const { control, handleSubmit, isSubmitting } = useLoginController()

    return (
        <MyScreenWrapperLayout scrollView className="flex-1 p-4 w-full md:w-3/4 lg:w-2/4 mx-auto">
            <View className="h-20"></View>
            <Text className="text-body text-center text-gray-600 text-2xl">
                Welcome To <Text className="text-primary-500 font-bold text-3xl">Expo App</Text>
            </Text>
            <View className="h-20"></View>

            <View>
                <View className="h-4"></View>
                <MyInputWithRHF
                    control={control}
                    name="email"
                    label="Email"
                    inputMode="email"
                    placeholder="Enter your email"
                />

                <View className="h-4"></View>
                <MyInputWithRHF
                    control={control}
                    name="password"
                    label="Password"
                    secureTextEntry
                    placeholder="Enter your password"
                />

                <View className="h-4"></View>
                <MyButton onPress={() => handleSubmit()} title="Login" loading={isSubmitting} />
            </View>
        </MyScreenWrapperLayout>
    )
}
