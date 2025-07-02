import { CheckboxProps } from "@/interfaces/reviewCheckInterfaces"
import { Button } from "@mui/material"
import React from "react"
import { useCheckboxClickHandler, useEditedIndexTracker } from "../hooks"

const getButtonProps = (status: string) => {
    const variantObject = {
        "CORRECT": { variant: "contained", color: "primary", sx: {} },
        "WRONG": { variant: "contained", color: "error", sx: {} },
        "NOT_SOLVED": {
            variant: "outlined",
            sx: {
                color: "hsl(0 0 95%)",
                borderColor: "hsl(0 0 30%)",
                "&:hover": { borderColor: "hsl(0 0 60%)" }
            }
        }
    }
    return variantObject[status] || variantObject["NOT_SOLVED"]
}

const Checkbox = React.memo(({
    index,
    reviewCheckData,
    status,
    setRecentTwoIndexes,
    setEditedIdStatusDictArray
}: CheckboxProps) => {
    const buttonProps = getButtonProps(status)

    const handleClick = useCheckboxClickHandler({ setRecentTwoIndexes })

    useEditedIndexTracker(reviewCheckData._id, status, reviewCheckData, setEditedIdStatusDictArray)

    return (
        <Button
            className={`w-[60px] h-[60px]`}
            onClick={handleClick}
            data-index={index}
            variant={buttonProps.variant}
            color={buttonProps.color}
            sx={buttonProps.sx}>

            {reviewCheckData.questionNumber}

        </Button>
    )
})

export default Checkbox

