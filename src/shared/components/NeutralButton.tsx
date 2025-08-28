import React from "react"
import { styleClassName } from "../constants/style"

type ButtonVariant = "NEUTRAL" | "VIVID_PILL"

export type ButtonColor = "RED" | "BLUE" | "YELLOW" | "DIM"

interface AdditionalProps {
    variant: ButtonVariant
    isOn?: boolean
    color?: ButtonColor
}

export type NeutralButtonProps =
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & AdditionalProps


const colorToClassName: Record<ButtonColor, string> = {
    DIM: `${styleClassName.borderMuted} ${styleClassName.fontMuted}  opacity-60`,
    RED: `${styleClassName.fontVividInverted} ${styleClassName.bgRed}`,
    YELLOW: `${styleClassName.fontVividInverted} ${styleClassName.bgYellow}`,
    BLUE: `${styleClassName.fontVividInverted} ${styleClassName.bgBlue}`,
}
    
const makeButtonClassName = (variant: ButtonVariant, isOn?: boolean, color?: ButtonColor) => {
    const classNameArray: string[] = [styleClassName.button]

    const fontAndBg = colorToClassName[color] ?? `${styleClassName.fontVividInverted} ${styleClassName.bgNeutral}`

    if (variant === "NEUTRAL") {
        classNameArray.push(styleClassName.buttonNeutral)
        classNameArray.push(
            isOn
                ? fontAndBg
                : styleClassName.buttonNeutralOff
        )
        const className = classNameArray.join(" ")
        return className
    }

    if (!isOn) {
        return styleClassName.buttonVividPillOff
    }

    return styleClassName.buttonVividPillOn
}

const NeutralButton = (props: NeutralButtonProps) => {
    const { variant, isOn, color, children, className, ...defaultProps } = props

    const baseClassName = makeButtonClassName(variant, isOn, color)

    return (
        <button {...defaultProps} className={`${className} ${baseClassName}`}>{children}</button>
    )
}

export default NeutralButton
