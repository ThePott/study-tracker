import MemoCard from '@/src/shared/components/MemoCard';
import { styleClassName } from '@/src/shared/constants/style';
import { inProgressStatusArray } from '@/src/shared/interfaces';
import useBoundStore from '@/src/shared/store';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ReactNode, useCallback, useState } from 'react';
import { inProgressStatusToBg } from './SummaryClassNameDict';

const DndProvider = ({ children }: { children: ReactNode }) => {
  const [activeBookTitle, setActiveBookTitle] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<number | null>(null)
  const updateInProgressStatus = useBoundStore((state) => state.updateInProgressStatus)
  const progressArrayInDict = useBoundStore((state) => state.progressArrayInDict)
  const setProgressArrayInDict = useBoundStore((state) => state.setProgressArrayInDict)

  const findActiveItem = useCallback(() => {
    if (!activeId) { return null }
    const activeItem = progressArrayInDict[activeBookTitle].find((progress) => progress.id === activeId)

    return activeItem
  }, [activeId])

  const activeItem = findActiveItem()

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(Number(active.id))
    setActiveBookTitle(active.data.current.bookTitle)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!active || !over) { return }
    if (active.id === over.id) { return }

    const overData = over.data?.current
    if (!overData) { return }

    const activeItem = findActiveItem()
    if (!activeItem) { return }

    if (activeItem.inProgressStatus === overData.inProgressStatus) {
      console.log("---- same status return")
      return
    }

    if (!inProgressStatusArray.includes(overData.inProgressStatus)) {
      debugger
      throw new Error("---- KANBAN ERROR: no over data in progress status")
    }
    updateInProgressStatus(activeItem.bookTitle, activeItem.id, overData.inProgressStatus)
    console.log("---- diff status:", activeItem.inProgressStatus, overData.inProgressStatus)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null)
      console.log("---- no over at end")
      return
    }

    if (over.id === active.id || !over.data?.current?.inProgressStatus) {
      console.log("---- nothing to log")
      setActiveId(null)
      return
    }

    const activeArray = progressArrayInDict[activeBookTitle]
    if (!activeArray) {
      debugger
      throw new Error("---- WHY NO ACTIVE ARRAY?")
    }
    const activeIndex = activeArray.findIndex((progress) => progress.id === active.id)
    let overIndex = activeArray.findIndex((progress) => progress.id === over.id,)

    if (activeIndex === -1) {
      debugger
      throw new Error("---- WHY NO INDEXES?")
    }
    if (overIndex === -1) {
      overIndex = activeArray.length - 1
    }

    if (activeIndex === overIndex) { return }
    const newActiveArray = arrayMove(activeArray, activeIndex, overIndex)
    const newProgressArrayInDict = { ...progressArrayInDict }
    newProgressArrayInDict[activeBookTitle] = newActiveArray
    setProgressArrayInDict(newProgressArrayInDict)

    setActiveId(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}

      <DragOverlay>
        <MemoCard className={`${inProgressStatusToBg[activeItem?.inProgressStatus]} z-20`}>
            <p className={`break-keep ${styleClassName.fontJustBold}`}>{activeItem?.bookTitle}</p>
            <p className={`break-keep `}>{activeItem?.stepTitle}</p>

            <div className="flex justify-between">
              <p className={`break-keep ${styleClassName.fontJustBold}`}>{activeItem?.questionGroupDescription}</p>
              <p className={`self-end`}>{activeItem?.inProgressStatus}</p>
            </div>
        </MemoCard>
      </DragOverlay>

    </DndContext>
  )
}

export default DndProvider