import MemoCard from "@/src/shared/components/MemoCard"
import { styleClassName } from "@/src/shared/constants/style"
import { Progress } from "@/src/shared/interfaces"
import { useSortable } from "@dnd-kit/sortable"
import { inProgressStatusToBg } from "./SummaryClassNameDict"

const SummaryBox = ({ progress }: { progress: Progress }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: progress.id,
    data: {
      type: "KANBAN",
      bookTitle: progress.bookTitle,
      inProgressStatus: progress.inProgressStatus
    }
  })
  // 드래그 중일 때의 스타일
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    zIndex: isDragging ? 10 : 1,
  }

  const baseClassName = `${styleClassName.pTight}`
  const isDraggingClassName = isDragging ? `border-2 border-white/60` : `${inProgressStatusToBg[progress.inProgressStatus]}`
  const className = `${baseClassName} ${isDraggingClassName}`

  return (
    <MemoCard
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={className}>


      <div className={isDragging ? "opacity-0" : ""}>
        <p className={`break-keep ${styleClassName.fontVividInverted} ${styleClassName.fontJustBold}`}>{progress.bookTitle}</p>
        <p className={`break-keep ${styleClassName.fontMutedInverted}`}>{progress.stepTitle}</p>

        <div className="flex justify-between">
          <p className={`break-keep ${styleClassName.fontVividInverted} ${styleClassName.fontJustBold}`}>{progress.questionGroupDescription}</p>
          <p className={`self-end ${styleClassName.fontMutedInverted}`}>{progress.inProgressStatus}</p>
        </div>
      </div>

    </MemoCard>
  )
}

export default SummaryBox

