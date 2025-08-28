import axios from "axios"
import { useEffect } from "react"

/** Neon에서의 progress properties */
type PatchingProgressPropertyName = "completed" | "in_progress_status"
type PatchingReviewCheckPropertyName = "status"

type PatchTo = "progress" | "review-check"
type PatchingPropertyName<T extends PatchTo> = T extends "progress" ? PatchingProgressPropertyName : PatchingReviewCheckPropertyName

export const useAutoSave = <T extends PatchTo>(patchTo: T, patchingPropertyName: PatchingPropertyName<T>, editedDict: Record<number, any>, mergeToInitial: () => void) => {
    useEffect(() => {
        if (Object.values(editedDict).length === 0) {
            return
        }

        const timeoutId = setTimeout(async () => {
            debugger
            const body = { patchingPropertyName, editedDict }
            const response = await axios.patch(`http://localhost:3456/${patchTo}`, body)
            const result = response.data
            console.log({ result })
            mergeToInitial()
        }, 2000)

        return () => clearTimeout(timeoutId)
    }, [editedDict])
}
