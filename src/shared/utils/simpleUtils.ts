import { CompletedStatus, completedStatusArray, ProgressData } from "../interfaces/_progressInterfaces";

export const findNextCompleted = (progress: ProgressData): CompletedStatus => {
    const currentCompleted = progress.completed
    const oldIndex = completedStatusArray.findIndex((completed) => completed === currentCompleted)
    const newIndex = (oldIndex + 1) % completedStatusArray.length
    return completedStatusArray[newIndex]
}