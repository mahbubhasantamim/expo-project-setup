import { useUserStore } from "@/hooks/user.store"
import { UserService } from "@/services/user/user.service"
import { PropsWithChildren, useEffect, useState } from "react"
import MyLoading from "../common/my-loading"

export default function AuthWrapper({ children }: PropsWithChildren) {
    const { setCurrentUser, logout, user } = useUserStore()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await UserService.getLoggedInUser()
                setCurrentUser(data.response)
                setLoading(false)
            } catch (error) {
                console.log(error)
                logout()
                setLoading(false)
            }
        }

        fetchData()
    }, [setCurrentUser, logout])
    if (isLoading) {
        return <MyLoading />
    }
    return <>{children}</>
}
