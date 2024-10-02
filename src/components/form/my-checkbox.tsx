import React from "react"
import { Image, TouchableOpacity } from "react-native"

interface IMyCheckbox {
    checked: boolean
    onChange: (checked: boolean) => void
}

export default function MyCheckbox({ checked, onChange }: IMyCheckbox) {
    return (
        <TouchableOpacity
            onPress={() => {
                onChange(!checked)
            }}>
            {checked ? (
                <Image
                    source={{
                        uri: "https://cdn4.iconfinder.com/data/icons/remixicon-system/24/checkbox-circle-line-256.png",
                    }}
                    className="w-8 h-8"
                />
            ) : (
                <Image
                    source={{
                        uri: "https://cdn3.iconfinder.com/data/icons/remixicon-system/24/checkbox-blank-circle-line-256.png",
                    }}
                    className="w-8 h-8"
                />
            )}
        </TouchableOpacity>
    )
}
