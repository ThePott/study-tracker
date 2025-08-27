import React from "react"
import { styleClassName } from "../constants/style"

type ButtonVariant = "NEUTRAL" | "VIVID_PILL"

interface AdditionalProps {
    variant: ButtonVariant
    isOn?: boolean
}

type NeutralButtonProps =
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & AdditionalProps



    
const makeButtonClassName = (variant: ButtonVariant, isOn?: boolean) => {
    const classNameArray: string[] = [styleClassName.button]

    if (variant === "NEUTRAL") {
        classNameArray.push(styleClassName.buttonNeutral)
        classNameArray.push(
            isOn
                ? styleClassName.buttonNeutralOn
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
    const { variant, isOn, children, className, ...defaultProps } = props

    const baseClassName = makeButtonClassName(variant, isOn)

    return (
        <button {...defaultProps} className={`${className} ${baseClassName}`}>{children}</button>
    )
}

export default NeutralButton
