import { TailwindColor } from "@/config/color.config"
import { RuleType } from "@/types/form.type"
import { useColorScheme } from "nativewind"
import React from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Keyboard, Text, TextInput, TextInputProps, View } from "react-native"
import ErrorMessage from "./error-message"

type Variant = "fill" | "outline"
const VariantObj = {
    fill: "bg-[#7676801F] dark:bg-gray-600 text-gray-600 dark:text-gray-300",
    outline: "border border-[#EEEEEE] text-gray-600 dark:text-gray-300",
}

type Size = "normal" | "sm"
const SizeVariantObj = {
    normal: "py-2.5",
    sm: "py-1.5",
}

interface IMyInput extends TextInputProps {
    variant?: Variant
    size?: Size
    label: string
    hideLabel?: boolean
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
    error?: string
    myRef?: React.LegacyRef<TextInput>
    handleNext?: () => void
}

export const MyInput = ({
    label,
    hideLabel = false,
    variant = "outline",
    size = "normal",
    error,
    myRef,
    handleNext,
    iconLeft,
    iconRight,
    ...others
}: IMyInput) => {
    const { style, value, onChangeText, onBlur, ...rest } = others
    const { colorScheme } = useColorScheme()

    return (
        <View className="flex flex-col" style={style}>
            {!hideLabel && (
                <View className="flex-row items-center">
                    <Text className="pl-1.5 mb-1 text-sm text-gray-500 dark:text-gray-400 mr-2">{label}</Text>
                </View>
            )}
            <View
                className={`flex flex-row justify-between items-center 
            ${error ? "border border-error" : ""} ${VariantObj[variant]} rounded-xl px-2
            `}>
                <View>{iconLeft && iconLeft}</View>

                <TextInput
                    ref={myRef}
                    className={`flex-1 ${SizeVariantObj[size]} px-2 outline-none`}
                    selectionColor={TailwindColor.primary[500]}
                    cursorColor={TailwindColor.primary[500]}
                    placeholderTextColor={
                        colorScheme === "light" ? TailwindColor.gray[600] : TailwindColor.gray[300]
                    }
                    placeholder={others.placeholder || label}
                    caretHidden={false}
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    onSubmitEditing={() => {
                        if (handleNext) {
                            handleNext()
                        } else {
                            Keyboard.dismiss()
                        }
                    }}
                    returnKeyType={handleNext ? "next" : "done"}
                    {...rest}
                />
                <View>{iconRight && iconRight}</View>
            </View>

            {error && <ErrorMessage error={error} />}
        </View>
    )
}

interface IMyInputWithRHF<T extends FieldValues> extends IMyInput {
    name: Path<T>
    control: Control<T>
    rules?: RuleType
}

export default function MyInputWithRHF<T extends FieldValues>({
    name,
    label,
    control,
    rules,
    myRef,
    handleNext,
    ...others
}: IMyInputWithRHF<T>) {
    return (
        <Controller
            name={name}
            // todo: check updated version of react hook form
            control={control}
            rules={rules}
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => {
                return (
                    <MyInput
                        myRef={myRef || ref}
                        label={label}
                        handleNext={handleNext}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={error?.message}
                        {...others}
                    />
                )
            }}
        />
    )
}
