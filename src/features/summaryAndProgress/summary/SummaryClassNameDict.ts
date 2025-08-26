import { styleClassName } from "@/src/shared/constants/style"
import { InProgressStatus } from "@/src/shared/interfaces"

export const inProgressStatusToBg: Record<InProgressStatus, string> = {
    PREV_HOMEWORK: styleClassName.bgRed,
    TODAY_WORK: styleClassName.bgBlue,
    NEXT_HOMEWORK: styleClassName.bgYellow,
}
