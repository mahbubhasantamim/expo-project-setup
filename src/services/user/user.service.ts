// import { IResponse } from "@/types/response.type"
// import { FCMUtil } from "@/utils/fcm.util"
// import { ApiService } from "../api.service"
// import { ISchool } from "../school/school.dto"
// import { IChildren } from "./user.dto"

// export const UserService = {
//     getChildrenList: async (parentId: string, school: ISchool) => {
//         const { data } = await ApiService.post<IResponse<IChildren[]>>(
//             school["GL2-PickupRequestApi/listchildren"],
//             {
//                 ParentID: parentId,
//             }
//         )
//         return data.data
//     },
//     createSnsEndpoint: async (parentId: string, school: ISchool) => {
//         const fcmToken = await FCMUtil.getFCMToken()
//         if (!fcmToken) {
//             throw new Error("generating fcm token failed.")
//         }
//         const { data } = await ApiService.post<IResponse<IChildren[]>>(
//             school["GL2-PickupRequestApi/createSNSendpoint"],
//             {
//                 ParentID: parentId,
//                 MobileDeviceCredentials: fcmToken,
//             }
//         )
//         return data.data
//     },
// }
