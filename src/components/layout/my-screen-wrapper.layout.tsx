import { TailwindUtil } from "@/utils/tailwind.util"
import React from "react"
import { SafeAreaView, ScrollView, View, ViewProps } from "react-native"

interface IMyScreenWrapper extends ViewProps {
    children: React.ReactNode
    disableSafeAreaView?: boolean
    scrollView?: boolean
}

export default function MyScreenWrapperLayout({
    children,
    className,
    disableSafeAreaView = false,
    scrollView = false,
    ...others
}: IMyScreenWrapper) {
    if (disableSafeAreaView) {
        return (
            <>
                {scrollView ? (
                    <ScrollView contentContainerClassName="flex-1" showsVerticalScrollIndicator={false}>
                        <View className={TailwindUtil.cn(`flex-1`, className)} {...others}>
                            {children}
                        </View>
                    </ScrollView>
                ) : (
                    <View className={TailwindUtil.cn(`flex-1`, className)} {...others}>
                        {children}
                    </View>
                )}
            </>
        )
    }
    return (
        <SafeAreaView className={`bg-white dark:bg-gray-950 flex-1`}>
            {scrollView ? (
                <ScrollView contentContainerClassName={TailwindUtil.cn(``, className)}>{children}</ScrollView>
            ) : (
                <View className={TailwindUtil.cn(`flex-1`, className)} {...others}>
                    {children}
                </View>
            )}
        </SafeAreaView>
    )
}
