import { ErrorBoundaryProps, SplashScreen, Stack } from "expo-router"

// Import your global CSS file
import { queryClient } from "@/config/query.config"
import { RouteConstant } from "@/constants/route.constant"
import { QueryClientProvider } from "@tanstack/react-query"
import { Button, Text, View } from "react-native"
import "../global.css"

export function ErrorBoundary(props: ErrorBoundaryProps) {
    return (
        <View>
            <Text>{props.error.message}</Text>
            <Button onPress={props.retry} title="Try Again" />
        </View>
    )
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={RouteConstant.ROOT.AUTH} />
                    <Stack.Screen name={RouteConstant.ROOT.PRIVATE} />
                </Stack>
            </QueryClientProvider>
        </>
    )
}
