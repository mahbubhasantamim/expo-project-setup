import { FieldValues, RegisterOptions } from "react-hook-form"

export type RuleType = Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>
