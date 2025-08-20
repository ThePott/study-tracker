import ProgressBox from "@/src/features/summaryAndProgress/progress/ProgressBox"
import useBoundStore from "@/src/shared/store"
import { closestCorners, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, MouseSensor, rectIntersection, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from "@dnd-kit/sortable"
import { JSX, useRef } from "react"
import { createPortal } from "react-dom"
// 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다

const DndProvider = ({ children }: { children: JSX.Element }) => {
  const progressArray = useBoundStore((state) => state.progressArray)
  const setProgressArrayFromDict = useBoundStore((state) => state.setProgressArrayFromDict)
  const handleStatusChange = useBoundStore((state) => state.handleStatusChange)


  const activeProgress = useBoundStore((state) => state.activeProgress)
  const setActiveProgress = useBoundStore((state) => state.setActiveProgress)
  const updateProgress = useBoundStore((state) => state.updateProgress)

  // Throttling refs
  const lastUpdateTime = useRef<number>(null)
  const throttleDelay = 100 // milliseconds

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
    if (!lastUpdateTime.current) {
      lastUpdateTime.current = Date.now()
    } else if (Date.now() - lastUpdateTime.current < throttleDelay) {
      return
    } else {
      lastUpdateTime.current = Date.now()
    }

    const { active, over } = event

    if (!over) { return }
    if (active.id === over.id) { return }

    const currentData = active.data.current
    const overData = over.data.current
    if (!currentData || !overData || currentData.type !== "KANBAN") { return }

    const isOverColumn = overData.type === "COLUMN"
    /** 다른 열 위에: 여기는 잘 작동함 */
    if (isOverColumn && currentData.kanban.inProgressStatus !== over.id) {
      const updatedProgress = {
        ...currentData.kanban,
        inProgressStatus: over.id
      }
      console.log("---- here! ... updating progress")
      updateProgress(updatedProgress)
    }

    /** 여기에 걸리는 건 내 열 위애 있는 것 */
    if (isOverColumn) {
      console.log("---- is over column:", overData.type, overData)
      return
    }

    /** 여기부터는 칸반 위 칸반 */
    console.log("---- kanban over kanban:", currentData, overData, progressArray)
    const copiedArray = [...progressArray]
    const oldIndex = copiedArray.findIndex((progress) => progress._id === active.id)
    const newIndex = copiedArray.findIndex((progress) => progress._id === over.id)

    if (copiedArray[oldIndex].inProgressStatus !== copiedArray[newIndex].inProgressStatus) {
      copiedArray[oldIndex] = { ...copiedArray[oldIndex], inProgressStatus: copiedArray[newIndex].inProgressStatus }
    }

    const newArray = arrayMove(copiedArray, oldIndex, newIndex)
    console.log("... re-ordering progress")
    setProgressArrayFromDict(newArray)


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

      setProgressArrayFromDict(newArray)

      handleStatusChange(progressArray[oldIndex])
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver} collisionDetection={rectIntersection}>
      {children}

      <DragOverlay>
        {activeProgress && <ProgressBox progress={activeProgress} />}
      </DragOverlay>,
    </DndContext>
  )
}

export default DndProvider