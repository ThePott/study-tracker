import { CheckboxSectionProps } from "@/src/shared/interfaces/OLD_reviewCheckInterfaces"
import useBoundStore from "@/src/shared/store"
import CloseIcon from "@mui/icons-material/Close"
import { Box, IconButton, Snackbar } from "@mui/material"
import { useCallback } from "react"
import { useAutoSave, useManualPatchWhenUnmount, useUpdateStatusArray } from "@/src/_hooks/reviewCheckHooks"
import ChangeToButtonGroup from "./OLD_ChangeToButtonGroup"
import Checkbox from "./OLD_Checkbox"
import Header from "./OLD_Header"

const CheckboxSection = ({ studentId }: CheckboxSectionProps) => {
    const hideResponseSnackbar = useCallback(
        useBoundStore((state) => state.hideResponseSnackbar),
        []
    )
    const response = useBoundStore((state) => state.response)
    const statusArray = useBoundStore((state) => state.statusArray)
    const reviewCheckArray = useBoundStore((state) => state.reviewCheckArray)
    console.log("---- status array length:", statusArray.length)

    // ---- call effect custom hooks
    useUpdateStatusArray()
    useAutoSave(studentId)
    useManualPatchWhenUnmount(studentId)

    const actionFragment = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                // 수동으로 끌 때 작동하는 함수
                onClick={hideResponseSnackbar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    )

    return (
        // Fold Level 5
        <>
            <Box className="flex flex-col h-full">
                <Header />

                <Box sx={{ scrollbarWidth: "none" }} className="grow overflow-y-scroll">
                    <Box className="grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-3 px-3">{statusArray.length !== 0 && reviewCheckArray.map((reviewCheckData, index) => <Checkbox key={reviewCheckData._id} reviewCheckData={reviewCheckData} index={index} status={statusArray[index]} />)}</Box>
                </Box>

                <ChangeToButtonGroup />

                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={response && response.doOpenSnackbar}
                    autoHideDuration={6000}
                    onClose={hideResponseSnackbar} // 자동으로 꺼질 때 작동하는 함수
                    message="Fail to save"
                    action={actionFragment}
                />
            </Box>
        </>
    )
}

export default CheckboxSection
