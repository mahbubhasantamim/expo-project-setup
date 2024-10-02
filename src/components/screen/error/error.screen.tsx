import MyButton from "@/components/form/my-button"
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout"
import React from "react"
import { Text } from "react-native"
import { ErrorUtil } from "../../../utils/error.util"

interface IErrorScreen {
    type?: "error" | "info"
    error: any
    resetErrorBoundary?: () => void
    resetLoading?: boolean
}

export default function ErrorScreen({
    type = "error",
    error,
    resetErrorBoundary,
    resetLoading = false,
}: IErrorScreen) {
    return (
        <MyScreenWrapperLayout className="p-4 justify-center">
            {/* <Image source={StaticImageList.Error} className="w-full h-80" /> */}

            <Text className="mb-2 text-h2 text-center text-error">
                {type === "error" ? "Error 😢" : "Hey, There"}
            </Text>
            <Text className="mb-4 text-body text-center text-gray-600 dark:text-gray-300">
                {ErrorUtil.getErrorMessage(error)?.message || "Something went wrong"}
            </Text>
            {resetErrorBoundary && (
                <MyButton
                    loading={resetLoading}
                    title="Try again"
                    onPress={() => {
                        resetErrorBoundary()
                    }}
                    variant="primary"
                />
            )}
        </MyScreenWrapperLayout>
    )
}
