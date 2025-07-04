import { CheckboxProps } from "@/interfaces/reviewCheckInterfaces"
import { Button } from "@mui/material"
import React, { useEffect } from "react"
import { useCheckboxClickHandler } from "../hooks"
import useReviewCheckStore from "@/store/reviewCheckStore"

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
    // setEditedIdStatusDictArray
}: CheckboxProps) => {
    const buttonProps = getButtonProps(status)

    const handleClick = useCheckboxClickHandler({ setRecentTwoIndexes })

    const updateOneEditedIdStatusDictArray = useReviewCheckStore((state) => state.updateOneEditedIdStatusDictArray)

    /** status 바뀔 때마다 실행되는 함수 --> edited array를  업데이트 하기만 함 */
    useEffect(
        () => {
            return () => {
                console.log("---- updating status")
                updateOneEditedIdStatusDictArray(status, reviewCheckData)
            }
        },
        [status]
    )


    return (
        <Button
            className={`w-[60px] h-[60px] grow-1`}
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

