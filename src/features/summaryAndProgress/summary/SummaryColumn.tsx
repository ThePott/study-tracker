import { InProgressStatus } from '@/src/shared/interfaces'
import useBoundStore from '@/src/shared/store'
import SummaryBox from './SummaryBox'

const inProgressStatusToKoreanDict: Record<InProgressStatus, string> = {
    PREV_HOMEWROK: "전 숙제",
    TODAY_WORK: "할당",
    NEXT_HOMEWORK: "새 숙제"
}

const SummaryColumn = ({ inProgressStatus }: { inProgressStatus: InProgressStatus }) => {
    const progressArrayInDict = useBoundStore((state) => state.progressArrayInDict)
    const valueArray = Object.values(progressArrayInDict)
    const flattenedArray = valueArray.flat()
    const filteredArray = flattenedArray.filter((progress) => progress.completed === "IN_PROGRESS" && progress.inProgressStatus === inProgressStatus)

    return (
        <div className="flex flex-col gap-2">
            <p className="text-center">{inProgressStatusToKoreanDict[inProgressStatus]}</p>
            {filteredArray.map((progress) => <SummaryBox progress={progress} />)}
        </div>
    )
}

export default SummaryColumn