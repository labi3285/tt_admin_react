import { ReactNode } from "react"

export type ButtonType = 'link' | 'text' | 'default' | 'primary' | 'dashed'

export type BooleanValueType = 'boolean' | 'number_0/1' | 'string_0/1' | 'string_TRUE/FALSE'

export type Option<T extends number | string | boolean> = {
    color?: string
    label: ReactNode,
    value: T,

    children?: Option<T>[]
}
