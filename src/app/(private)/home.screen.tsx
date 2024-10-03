import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout"
import React from "react"
import { Text, View } from "react-native"

export default function HomeScreen() {
    return (
        <MyScreenWrapperLayout scrollView className="flex-1 p-4 w-full md:w-3/4 lg:w-2/4 mx-auto">
            <View className="h-20"></View>
            <Text className="text-body text-center text-gray-600 text-2xl">Welcome To Home page</Text>
            <View className="h-20"></View>
        </MyScreenWrapperLayout>
    )
}
