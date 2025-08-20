import { InProgressStatus } from '@/src/shared/interfaces'
import useBoundStore from '@/src/shared/store'
import SummaryBox from './SummaryBox'
import { styleClassName } from '@/src/shared/constants/style'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { memo } from 'react'

const inProgressStatusToKorean: Record<InProgressStatus, string> = {
    PREV_HOMEWROK: "전 숙제",
    TODAY_WORK: "할당",
    NEXT_HOMEWORK: "새 숙제"
}

const SummaryColumn = memo(({ inProgressStatus }: { inProgressStatus: InProgressStatus }) => {
    const progressArrayInDict = useBoundStore((state) => state.progressArrayInDict)
    
    const valueArray = Object.values(progressArrayInDict)
    const flattenedArray = valueArray.flat()
    const filteredArray = flattenedArray.filter((progress) => progress.completed === "IN_PROGRESS" && progress.inProgressStatus === inProgressStatus)

    const { setNodeRef, isOver } = useDroppable({
        id: inProgressStatus,
        data: {
            type: "COLUMN",
            inProgressStatus
        }
    });

    return (
        <div ref={setNodeRef} className={`flex flex-col gap-2 ${styleClassName.memoWidth}`}>

            <p className="text-center">{inProgressStatusToKorean[inProgressStatus]}</p>

            <SortableContext items={filteredArray} strategy={verticalListSortingStrategy}>
                {filteredArray.map((progress) => <SummaryBox key={progress.id} progress={progress} />)}
            </SortableContext>
            
        </div>
    )
})

export default SummaryColumn