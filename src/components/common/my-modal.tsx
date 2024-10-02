import { ImageConstant } from "@/constants/image.constant"
import React from "react"
import { Image, Modal, ScrollView, Text, View } from "react-native"
import MyButton from "../form/my-button"

// dialog content can be anything with a default content (image,title,desc)
// dialog button will be a list, default will be one button just say ok
type AlertType = "info" | "error" | "success"

type IVariantDisplayType = "modal" | "bottomSheet" | "fullScreen"

const variantDisplayType = {
    modal: "justify-center items-center rounded-2xl min-h-[280px] p-6",
    bottomSheet: "justify-center items-center rounded-t-2xl p-6",
    fullScreen: "justify-start rounded-t-2xl p-0 h-[95vh]",
}

export interface IModal {
    type?: AlertType
    displayType?: IVariantDisplayType
    title: string
    description: string
    visible: boolean
    isDismissible?: boolean
    closeButtonTitle?: string
    onClose: () => void
    children?: React.ReactNode
    customButtons?: React.ReactNode
    CustomButtonsFn?: () => React.JSX.Element
    showOnlyChildren?: boolean
    customImage?: React.ReactNode
    customPadding?: string
}

export default function MyModal({
    type = "info",
    displayType = "modal",
    title,
    description,
    visible,
    closeButtonTitle = "Close",
    onClose,
    children,
    customButtons,
    CustomButtonsFn,
    isDismissible = false,
    showOnlyChildren = false,
    customImage,
    customPadding = "p-6",
}: IModal) {
    return (
        <Modal
            animationType={displayType === "modal" ? "fade" : "slide"}
            statusBarTranslucent={true}
            visible={visible}
            transparent
            onRequestClose={() => {
                if (isDismissible) {
                    // handle back button
                    onClose()
                }
            }}>
            <View
                onTouchStart={() => {
                    if (isDismissible) {
                        // handle back button
                        onClose()
                    }
                }}
                className={`flex-1 ${
                    displayType === "modal" ? `justify-center ${customPadding}` : "justify-end"
                } bg-gray-800/50 dark:bg-gray-600/90`}>
                <View
                    onTouchStart={e => {
                        e.stopPropagation()
                    }}
                    className={`z-30 bg-white justify-center items-center ${variantDisplayType[displayType]}`}>
                    <View className="w-full space-y-4">
                        {showOnlyChildren === false ? (
                            <>
                                <View className="w-full items-center">
                                    {customImage ? (
                                        <>{customImage}</>
                                    ) : (
                                        <Image
                                            source={
                                                type === "success"
                                                    ? ImageConstant.SUCCESS
                                                    : type === "error"
                                                    ? ImageConstant.ERROR
                                                    : ImageConstant.INFO
                                            }
                                            className="w-24 h-24"
                                            resizeMethod="resize"
                                            resizeMode="stretch"
                                        />
                                    )}
                                </View>
                                <View className="h-4" />
                                <ScrollView className="max-h-[380px] space-y-4">
                                    <Text className="text-h3 font-semibold capitalize text-center text-[#15240F]">
                                        {title}
                                    </Text>
                                    <Text className="text-body-paragraph text-center text-gray-500 dark:text-gray-400">
                                        {description}
                                    </Text>
                                    {children && children}
                                </ScrollView>
                            </>
                        ) : (
                            <>{children && children}</>
                        )}
                        {/* buttons */}
                        <View className="w-full">
                            {CustomButtonsFn ? (
                                <CustomButtonsFn />
                            ) : customButtons ? (
                                customButtons
                            ) : (
                                <MyButton
                                    title={closeButtonTitle}
                                    onPress={() => {
                                        onClose()
                                    }}
                                />
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

// * how to use for global modal
// ? setup in root component
// const modal = useGlobalModal()
// <MyModal {...modal} />

// ? after setup show or hide the modal using useGlobalModalStoreShowClose() this hook in any component
// const { showModal, closeModal } = useGlobalModalStoreShowClose()
// const onAnyButtonClick = () => {
//     showModal({
//         visible: true,
//         title: "Wrong Credentials",
//         description: "check your email and password",
//         onClose: () => {
//             closeAlert()
//         },
//         customButtons: (
//             <>
//                 <MyButton
//                     title="No Problem"
//                     onPress={() => {
//                         console.log("Press No Problem")
//                     }}
//                 />
//                 <MySpacer />
//                 <MyButton
//                     title="Hello"
//                     onPress={() => {
//                         console.log("press hello()")
//                     }}
//                     variant="outline"
//                 />
//             </>
//         ),
//     })
// }
