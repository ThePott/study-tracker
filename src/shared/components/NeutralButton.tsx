import React from 'react'
import { styleClassName } from '../constants/style'

interface AdditionalProps {
    label: string
}

type NeutralButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & AdditionalProps

const NeutralButton = (props: NeutralButtonProps) => {
    const { label, ...defaultProps } = props
    return (
        <button {...defaultProps} className={styleClassName.button}>{label}</button>
    )
}

export default NeutralButton