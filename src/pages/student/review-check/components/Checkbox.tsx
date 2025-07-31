import { CheckboxProps, CheckboxStatus } from "@/src/_interfaces/reviewCheckInterfaces"
import { Button } from "@mui/material"
import React, { useCallback, useEffect, useRef } from "react"
import { useCheckboxClickHandler } from "../../../../_hooks/reviewCheckHooks"
import useReviewCheckStore from "@/src/_store/reviewCheckStore"

const variantObject = {
    "CORRECT": { variant: "contained", color: "primary", sx: {} },
    "WRONG": { variant: "contained", color: "error", sx: {} },
    "PASS": { variant: "contained", color: "warning", sx: {} },
    "NOT_SOLVED": {
        variant: "outlined",
        color: undefined,
        sx: {
            color: "hsl(0 0 95%)",
            borderColor: "hsl(0 0 30%)",
            "&:hover": { borderColor: "hsl(0 0 60%)" }
        }
    },
    "DONE": {
        variant: "contained",
        color: undefined,
        sx: {
            color: "hsl(0 0 65%)",
            backgroundColor: "hsl(0 0 0)",
            borderColor: "hsl(0 0 0)",
        }
    },
} as const

const Checkbox = React.memo(({
    index,
    reviewCheckData,
    status,
}: CheckboxProps) => {
    const buttonProps = status ? variantObject[status] : variantObject["NOT_SOLVED"]

    const handleClick = useCheckboxClickHandler()

    const updateOneEditedIdStatusDictArray = useReviewCheckStore((state) => state.updateOneEditedIdStatusDictArray)
    const startResponseLoading = useReviewCheckStore((state) => state.startResponseLoading)

    /** status 바뀔 때마다 실행되는 함수 --> edited array를  업데이트 하기만 함 */
    const prevStausRef = useRef<CheckboxStatus>(status)

    useEffect(
        () => {
            if (!status) { return }
            if (prevStausRef.current === status) { return }

            updateOneEditedIdStatusDictArray(status, reviewCheckData)
            console.log("---- status change -> start loading:", index, status)
            startResponseLoading()
            prevStausRef.current = status
        },
        [status]
    )

    // console.log("---- checkbox re-render:", index)
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

