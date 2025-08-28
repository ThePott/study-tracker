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


const colorToBg: Record<ButtonColor, string> = {
    DIM: `${styleClassName.borderMuted} ${styleClassName.fontMuted}  opacity-60`,
    RED: styleClassName.bgRed,
    YELLOW: styleClassName.bgYellow,
    BLUE: styleClassName.bgBlue,
}
    
const makeButtonClassName = (variant: ButtonVariant, isOn?: boolean, color?: ButtonColor) => {
    const classNameArray: string[] = [styleClassName.button]

    const bg = colorToBg[color] ?? styleClassName.bgNeutral

    if (variant === "NEUTRAL") {
        classNameArray.push(styleClassName.buttonNeutral)
        classNameArray.push(
            isOn
                ? `${styleClassName.fontVividInverted} ${bg}`
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
