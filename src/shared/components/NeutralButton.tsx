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
    if (variant === "NEAUTRUAL") {
        return styleClassName.buttonNeutral
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