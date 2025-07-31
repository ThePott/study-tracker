import { useAutoSaveProgress, useProgressGet } from "@/src/_hooks/progressHooks"
import { inProgressStatusArray } from "@/src/_interfaces/progressInterfaces"
import useInstructorStore from "@/src/_store/instructorStore"
import useProgressStore from "@/src/_store/progressStore"
import { closestCorners, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, MouseSensor, rectIntersection, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from "@dnd-kit/sortable"
import { Box, Button } from "@mui/material"
import { createPortal } from "react-dom"
import ProgressBox from "./instructorProgressComponents/ProgressBox"
import ProgressColumn from "./instructorProgressComponents/ProgressColumn"

const InstructorProgressPage = () => {
  const progressArray = useProgressStore((state) => state.progressArray)
  const setProgressArray = useProgressStore((state) => state.setProgressArray)
  const handleStatusChange = useProgressStore((state) => state.handleStatusChange)


  const activeProgress = useProgressStore((state) => state.activeProgress)
  const setActiveProgress = useProgressStore((state) => state.setActiveProgress)
  const updateProgress = useProgressStore((state) => state.updateProgress)

  useAutoSaveProgress()
  useProgressGet()

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor)

  const handleDragStart = (event: DragStartEvent) => {
    console.log("----started")
    const currentEventData = event.active.data.current

    if (currentEventData?.type === "KANBAN") {
      setActiveProgress(currentEventData.kanban)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) { return }
    if (active.id === over.id) { return }

    const currentData = active.data.current
    const overData = over.data.current
    if (!currentData || !overData) { return }

    const isOverColumn = overData.type === "COLUMN"
    if (isOverColumn && currentData.kanban.inProgressStatus !== over.id) {
      currentData.kanban.inProgressStatus = over.id

      const updatedProgress = {
        ...currentData.kanban,
        inProgressStatus: over.id
      }
      updateProgress(updatedProgress)

      // updateProgress(currentData.kanban)
    }

    const isKanbanActive = currentData.type === "KANBAN"
    const isOverAnotherKanban = overData.type === "KANBAN"

    if (isKanbanActive && isOverAnotherKanban) {
      const copiedArray = [...progressArray]
      const oldIndex = copiedArray.findIndex((progress) => progress._id === active.id)
      const newIndex = copiedArray.findIndex((progress) => progress._id === over.id)

      if (copiedArray[oldIndex].inProgressStatus !== copiedArray[newIndex].inProgressStatus) {
        copiedArray[oldIndex] = { ...copiedArray[oldIndex], inProgressStatus: copiedArray[newIndex].inProgressStatus }
      }

      const newArray = arrayMove(copiedArray, oldIndex, newIndex)

      setProgressArray(newArray)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveProgress(null)

    const { active, over } = event

    const currentData = active.data.current
    const overData = over.data.current
    if (!currentData || !overData) { return }

    const isKanbanActive = currentData.type === "KANBAN"
    const isOverAnotherKanban = overData.type === "KANBAN"

    if (isKanbanActive && isOverAnotherKanban) {
      const oldIndex = progressArray.findIndex((progress) => progress._id === active.id)
      const newIndex = progressArray.findIndex((progress) => progress._id === over.id)

      const newArray = arrayMove(progressArray, oldIndex, newIndex)

      setProgressArray(newArray)

      handleStatusChange(progressArray[oldIndex])
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver} collisionDetection={rectIntersection}>
      <Box className="flex gap-3">
        {inProgressStatusArray.map((inProgressStatus) => <ProgressColumn key={inProgressStatus} inProgressStatus={inProgressStatus} />)}
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