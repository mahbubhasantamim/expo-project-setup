import { TailwindColor } from "@/config/color.config"
import { RuleType } from "@/types/form.type"
import React, { useState } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Platform, Text, View } from "react-native"
import DropDownPicker, { ItemType, ValueType } from "react-native-dropdown-picker"
import ErrorMessage from "./error-message"

export type IMyDropDownItem = ItemType<ValueType>

interface IMyDropDown<T> {
    label: string
    placeholder?: string
    options: IMyDropDownItem[]
    loading?: boolean
    error?: string
    value: T | null
    onChange: (value: T) => void
    zIndex?: number
}

export default function MyDropDown<T>({
    label,
    placeholder = "Select ...",
    options,
    value,
    onChange,
    loading = false,
    error,
    zIndex,
}: IMyDropDown<T>) {
    const [open, setOpen] = useState(false)
    const [value2, setValue2] = useState(value)

    return (
        <View style={{ ...(Platform.OS === "ios" && { zIndex }) }}>
            <Text className="pl-1.5 mb-1 text-sm text-gray-500 dark:text-gray-400">{label}</Text>
            <DropDownPicker
                listMode="SCROLLVIEW"
                disabled={loading}
                style={{
                    borderColor: "#EEEEEE",
                    zIndex: 10,
                }}
                dropDownContainerStyle={{
                    borderColor: "#EEEEEE",
                    backgroundColor: "#EEEEEE",
                    zIndex: 20,
                }}
                textStyle={{
                    color: TailwindColor.gray[800],
                }}
                placeholder={placeholder}
                open={open}
                setOpen={setOpen}
                items={options}
                // setItems={setItems}
                value={value2 as ValueType}
                onSelectItem={item => {
                    onChange(item.value as T)
                }}
                setValue={setValue2}
            />
            {error && <ErrorMessage error={error} />}
        </View>
    )
}

// dropdown with rhf
interface IMyDropDownWithRFH<T extends FieldValues> extends Omit<IMyDropDown<T>, "onChange" | "value"> {
    label: string
    name: Path<T>
    control: Control
    rules?: RuleType
    zIndex?: number
}

export const MyDropDownWithRFH = <T extends FieldValues>({
    label,
    name,
    control,
    rules,
    options,
    placeholder,
    zIndex = 1,
}: IMyDropDownWithRFH<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => {
                return (
                    <MyDropDown
                        label={label}
                        options={options}
                        onChange={value => {
                            field.onChange(value)
                        }}
                        value={field.value}
                        error={error?.message}
                        zIndex={zIndex}
                        placeholder={placeholder}
                    />
                )
            }}
        />
    )
}
