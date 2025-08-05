import ProgressBox from "@/src/features/summary/ProgressBox"
import useBoundStore from "@/src/shared/store"
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, MouseSensor, rectIntersection, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from "@dnd-kit/sortable"
import { JSX } from "react"
import { createPortal } from "react-dom"
// 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다

const DndProvider = ({ children }: { children: JSX.Element }) => {
  const progressArray = useBoundStore((state) => state.progressArray)
  const setProgressArray = useBoundStore((state) => state.setProgressArray)
  const handleStatusChange = useBoundStore((state) => state.handleStatusChange)


  const activeProgress = useBoundStore((state) => state.activeProgress)
  const setActiveProgress = useBoundStore((state) => state.setActiveProgress)
  const updateProgress = useBoundStore((state) => state.updateProgress)


  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor)

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

    const currentData = active.data.current
    const overData = over.data.current
    if (!currentData || !overData) { return }

    const isOverColumn = overData.type === "COLUMN"
    if (isOverColumn && currentData.kanban.inProgressStatus !== over.id) {
      // currentData.kanban.inProgressStatus = over.id

      const updatedProgress = {
        ...currentData.kanban,
        inProgressStatus: over.id
      }
      updateProgress(updatedProgress)
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
      {children}

      {createPortal(
        <DragOverlay>
          {activeProgress && <ProgressBox progress={activeProgress} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}

export default DndProvider