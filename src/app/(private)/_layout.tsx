import { TailwindColor } from "@/config/color.config"
import { RouteConstant } from "@/constants/route.constant"
import { useUserStore } from "@/hooks/user.store"
import { Feather } from "@expo/vector-icons"
import { Redirect, Tabs } from "expo-router"
import React from "react"
import { SafeAreaView, Text } from "react-native"

export default function PrivateLayout() {
    // todo: check if user is not logged in. redirect to login.screen
    const user = useUserStore(s => s.user)

    if (!user) {
        return <Redirect href={RouteConstant.AUTH_NAV.LOGIN_SCREEN} />
    }

    if (user) {
        return (
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: TailwindColor.primary[500],
                    tabBarStyle: {
                        height: 70, // 65
                        paddingTop: 4, //8
                        paddingBottom: 4, //0
                    },
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name={RouteConstant.HOME_NAV.HOME_SCREEN}
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color }) => <Feather name="home" size={28} color={color} />,
                    }}
                />

                {/* inner components file */}
            </Tabs>
        )
    }

    return (
        <SafeAreaView className="flex-1 justify-center items-center">
            <Text>Please Verify</Text>
        </SafeAreaView>
    )
}
