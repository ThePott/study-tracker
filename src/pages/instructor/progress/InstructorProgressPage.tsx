import { useProgressGet } from "@/src/_hooks/progressHooks"
import useInstructorStore from "@/src/_store/instructorStore"
import useProgressStore from "@/src/_store/progressStore"
import ProgressBox from "./instructorProgressComponents/ProgressBox"
import { inProgressStatusArray } from "@/src/_interfaces/progressInterfaces"
import ProgressColumn from "./instructorProgressComponents/ProgressColumn"
import { Box } from "@mui/material"
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { createPortal } from "react-dom"
import { arrayMove } from "@dnd-kit/sortable"

const InstructorProgressPage = () => {
  const student = useInstructorStore((state) => state.selectedStudent)
  const progressArray = useProgressStore((state) => state.progressArray)
  const setProgressArray = useProgressStore((state) => state.setProgressArray)
  useProgressGet(student?.studentId)

  const activeProgress = useProgressStore((state) => state.activeProgress)
  const setActiveProgress = useProgressStore((state) => state.setActiveProgress)
  const updateProgress = useProgressStore((state) => state.updateProgress)
  // const progressArray = useProgressStore((state) => state.progressArray)


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      }
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const currentEventData = event.active.data.current

    if (currentEventData?.type === "KANBAN") {
      setActiveProgress(currentEventData.kanban)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) { return }
    if (active.id === over.id) { return }

    const curentData = active.data.current
    const overData = over.data.current
    if (!curentData || !overData) { return }

    const isOverColumn = overData.type === "COLUMN"
    if (isOverColumn) {
      const copiedProgress = { ...curentData.kanban }
      copiedProgress.inProgressStatus = over.id

      updateProgress(copiedProgress) //<----------- update은 나중에 한 번에 하는 걸로 바꿔야
    }

    
    const isKanbanActive = curentData.type === "KANBAN"
    const isOverAnotherKanban = overData.type === "KANBAN"

    if (isKanbanActive && isOverAnotherKanban) {
      const oldIndex = progressArray.findIndex((progress) => progress._id === active.id)
      const newIndex = progressArray.findIndex((progress) => progress._id === over.id)

      const newArray = arrayMove(progressArray, oldIndex, newIndex)

      setProgressArray(newArray)

      progressArray[oldIndex].inProgressStatus = progressArray[newIndex].inProgressStatus
    }
  }


  const handleDragEnd = (event: DragEndEvent) => {
    setActiveProgress(null)

    const { active, over } = event

    // if (!over) { return }
    // if (active.id === over.id) { return }

    // const oldIndex = boardIdArray.indexOf(active.id)
    // const newIndex = boardIdArray.indexOf(over.id)

    // const newArray = arrayMove(boardArray, oldIndex, newIndex)

    // setBoardArray(newArray)
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      <Box className="flex gap-3">
        {inProgressStatusArray.map((inProgressStatus) => <ProgressColumn inProgressStatus={inProgressStatus} />)}
      </Box>

      {createPortal(
        <DragOverlay>
          {activeProgress && <ProgressBox progress={activeProgress} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}

export default InstructorProgressPage