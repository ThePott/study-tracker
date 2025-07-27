import { useProgressGet } from "@/src/_hooks/progressHooks"
import useInstructorStore from "@/src/_store/instructorStore"
import useProgressStore from "@/src/_store/progressStore"
import ProgressBox from "./instructorProgressComponents/ProgressBox"
import { inProgressStatusArray } from "@/src/_interfaces/progressInterfaces"
import ProgressColumn from "./instructorProgressComponents/ProgressColumn"
import { Box } from "@mui/material"
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { createPortal } from "react-dom"

const InstructorProgressPage = () => {
  const student = useInstructorStore((state) => state.selectedStudent)
  useProgressGet(student?.studentId)

  const activeProgress = useProgressStore((state) => state.activeProgress)
  const setActiveProgress = useProgressStore((state) => state.setActiveProgress)
  // const progressArray = useProgressStore((state) => state.progressArray)


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20,
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