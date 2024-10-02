// import { EnvConfig } from "@/config/env.config"
// import { QUERY_KEYS } from "@/config/query.config"
// import { useUserStore } from "@/hooks/user.store"
// import { ISchool } from "@/services/school/school.dto"
// import { SchoolService } from "@/services/school/school.service"
// import { IUserState } from "@/services/user/user.dto"
// import { UserService } from "@/services/user/user.service"
// import { RnUtils } from "@/utils/rn.util"
// import { useQuery } from "@tanstack/react-query"
// import { AccessTokenRequestConfig, ResponseType, exchangeCodeAsync, useAuthRequest } from "expo-auth-session"
// import * as WebBrowser from "expo-web-browser"
// import { jwtDecode } from "jwt-decode"
// import { useEffect, useMemo, useState } from "react"
// import { ALERT_TYPE } from "react-native-alert-notification"

// // this is not route because not export default

// WebBrowser.maybeCompleteAuthSession()

// export function useLoginController() {
//     const setCurrentUser = useUserStore(s => s.setCurrentUser)
//     const {
//         data: schools,
//         isLoading: schoolsLoading,
//         error: schoolsError,
//         refetch: schoolsRefetch,
//         isRefetching: schoolsRefetching,
//     } = useQuery({
//         queryKey: [QUERY_KEYS.SCHOOLS],
//         queryFn: () => {
//             return SchoolService.getSchoolList()
//         },
//     })
//     const [authLoading, setAuthLoading] = useState<boolean>(false)
//     const [schoolId, setSchoolId] = useState<undefined | string>()
//     const [selectedSchool, setSelectedSchool] = useState<ISchool | undefined>()

//     useEffect(() => {
//         if (schoolId) {
//             const _selectedSchool = schools.find(it => it.SchoolID === schoolId)
//             setSelectedSchool(_selectedSchool)
//         }
//     }, [schoolId])

//     // setup cognito
//     const discoveryDocument = useMemo(() => {
//         if (selectedSchool) {
//             return {
//                 authorizationEndpoint: selectedSchool.UserPoolDomain + "/oauth2/authorize",
//                 tokenEndpoint: selectedSchool.UserPoolDomain + "/oauth2/token",
//                 revocationEndpoint: selectedSchool.UserPoolDomain + "/oauth2/revoke",
//             }
//         }
//         return undefined
//     }, [selectedSchool])
//     const [request, response, promptAsync] = useAuthRequest(
//         {
//             clientId: selectedSchool?.ClientId,
//             responseType: ResponseType.Code,
//             redirectUri: EnvConfig.AUTH_REDIRECT_URI,
//             usePKCE: true,
//         },
//         discoveryDocument
//     )

//     useEffect(() => {
//         const exchangeFn = async (exchangeTokenReq: AccessTokenRequestConfig) => {
//             setAuthLoading(true)
//             try {
//                 const exchangeTokenResponse = await exchangeCodeAsync(exchangeTokenReq, discoveryDocument)
//                 const info = jwtDecode<{
//                     "cognito:username": string
//                     email: string
//                 }>(exchangeTokenResponse.idToken)
//                 const parentId = info["cognito:username"]
//                 setCurrentUser({
//                     parentId,
//                     email: info.email,
//                     ...exchangeTokenResponse,
//                     school: selectedSchool,
//                     state: IUserState.NOT_INLINE,
//                 })
//                 // create sns token
//                 await UserService.createSnsEndpoint(parentId, selectedSchool)
//             } catch (error) {
//                 console.error("exchangeFn:Error: -> ", error)
//             } finally {
//                 setAuthLoading(false)
//             }
//         }
//         if (response) {
//             if (response.type === "success") {
//                 exchangeFn({
//                     clientId: selectedSchool.ClientId,
//                     code: response.params.code,
//                     redirectUri: EnvConfig.AUTH_REDIRECT_URI,
//                     extraParams: {
//                         code_verifier: request.codeVerifier,
//                     },
//                 })
//             } else {
//                 RnUtils.toast("Something went wrong", "Try again later", ALERT_TYPE.DANGER)
//             }
//         }
//     }, [discoveryDocument, request, response])

//     const saveSchoolAndContinue = () => {
//         // check if we have school selected or not
//         if (!schoolId) {
//             RnUtils.toast("Select School", "Select school to continue", ALERT_TYPE.DANGER)
//             return
//         }

//         // main cognito call
//         promptAsync()
//     }

//     return {
//         schools: schools || [],
//         schoolsLoading,
//         schoolsError,
//         schoolsRefetch,
//         schoolsRefetching,
//         schoolId,
//         setSchoolId,
//         saveSchoolAndContinue,
//         authLoading,
//     }
// }
