import {
    CompletedStatus,
    completedStatusArray,
    Progress,
} from "../interfaces/_progressInterfaces"

export const findNextCompleted = (progress: Progress): CompletedStatus => {
    const currentCompleted = progress.completed
    const oldIndex = completedStatusArray.findIndex(
        (completed) => completed === currentCompleted
    )
    const newIndex = (oldIndex + 1) % completedStatusArray.length
    return completedStatusArray[newIndex]
}
