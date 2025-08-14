import React from 'react'
import { styleClassName } from '../constants/style'

type ButtonVariant = "NEAUTRUAL" | "VIVID_PILL"

interface AdditionalProps {
    label: string
    variant: ButtonVariant
    isOn?: boolean
}

type NeutralButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & AdditionalProps

const makeButtonClassName = (variant: ButtonVariant, isOn?: boolean) => {
    const classNameArray: string[] = [styleClassName.button]

    if (variant === "NEAUTRUAL") {
        classNameArray.push(styleClassName.buttonNeutral)
        classNameArray.push(isOn ? styleClassName.buttonNeutralOn : styleClassName.buttonNeutralOff)
        const className = classNameArray.join(" ")
        return className
    }

    if (!isOn) {
        return styleClassName.buttonVividPillOff
    }

    return styleClassName.buttonVividPillOn
}

const NeutralButton = (props: NeutralButtonProps) => {
    const { label, variant, isOn, ...defaultProps } = props

    const className = makeButtonClassName(variant, isOn)

    return (
        <button {...defaultProps} className={className}>{label}</button>
    )
}

export default NeutralButton