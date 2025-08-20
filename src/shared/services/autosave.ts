import axios from "axios"
import { useEffect } from "react"

/** Neon에서의 progress properties */
type PatchingPropertyName = "completed" | "in_progress_status"

export const useAutoSave = (patchingPropertyName: PatchingPropertyName, editedDict: Record<number, any>, mergeToInitial: () => void) => {
    useEffect(() => {
        if (Object.values(editedDict).length === 0) { return }
        
        const timeoutId = setTimeout(async () => {
            const body = { patchingPropertyName, editedDict }
            const response = await axios.patch("http://localhost:3456/progress", body)
            const result = response.data
            console.log({ result })
            mergeToInitial()
        }, 2000)

        return () => clearTimeout(timeoutId)

    }, [editedDict])

}