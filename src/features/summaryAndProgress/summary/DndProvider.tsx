import { inProgressStatusArray } from '@/src/shared/interfaces';
import useBoundStore from '@/src/shared/store';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ReactNode, useCallback, useState } from 'react';

const DndProvider = ({ children }: { children: ReactNode }) => {
  const [activeBookTitle, setActiveBookTitle] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<number | null>(null)
  const updateInProgressStatus = useBoundStore((state) => state.updateInProgressStatus)
  const progressArrayInDict = useBoundStore((state) => state.progressArrayInDict)
  const setProgressArrayInDict = useBoundStore((state) => state.setProgressArrayInDict)

  const findActiveItem = useCallback(() => {
    if (!activeId) { return null }
    const activeItem = progressArrayInDict[activeBookTitle].find((progress) => progress.id === activeId)
    console.log({ array: progressArrayInDict[activeBookTitle] })

    return activeItem
  }, [activeId])

  // 현재 드래그 중인 항목의 데이터를 찾습니다
  // const activeItem = findActiveItem()

  // 드래그 시작 시 호출
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(Number(active.id))
    setActiveBookTitle(active.data.current.bookTitle)
  }

  // 드래그 오버 핸들러
  // 항목이 드래그되면서 다른 항목이나 영역 위에 있을 때 지속적으로 호출됩니다
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!active || !over) return;
    if (active.id === over.id) return;

    const overData = over.data?.current;
    if (!overData) {
      return;
    }

    const activeItem = findActiveItem()
    if (!activeItem) {
      // debugger;
      return;
    }

    // 다른 보드 위로 드래그 중일 때
    // 시각적 피드백을 위해 임시로 타입 변경 (실제 데이터는 handleDragEnd에서 변경됨)
    if (activeItem.inProgressStatus === overData.inProgressStatus) { return }
    if (!inProgressStatusArray.includes(overData.inProgressStatus)) {
      debugger
      throw new Error("---- KANBAN ERROR: no over data in progress status")
    }
    updateInProgressStatus(activeItem.bookTitle, activeItem.id, overData.inProgressStatus)
  }

  // 드래그 종료 시 호출
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

    // 드래그 중인 항목 찾기
    const activeItem = findActiveItem()

    // 다른 보드로 항목 이동 (예: todo -> inprogress)
    // over.data?.current?.type은 드롭된 보드의 타입을 나타냄 (useDroppable에서 data로 설정한 값)
    if (activeItem.inProgressStatus !== over.data.current.inProgressStatus) {
      // 항목의 타입을 변경하여 다른 보드로 이동
      // ---- 이거 굳이 필요하나??? 근데 반 공간이 아니라 칸반 위로 하면 여기로 온다.
      updateInProgressStatus(activeItem.bookTitle, activeItem.id, over.data?.current?.inProgressStatus)
      setActiveId(null)
      console.log("---- diff col")
      return
    }
    // 동일 보드 내에서 항목 순서 변경
    // 드래그한 항목과 드롭 위치 항목의 인덱스 찾기

    const activeArray = progressArrayInDict[activeBookTitle]
    if (!activeArray) {
      debugger
      throw new Error("---- WHY NO ACTIVE ARRAY?")
    }
    const activeIndex = activeArray.findIndex((progress) => progress.id === active.id)
    const overIndex = activeArray.findIndex((progress) => progress.id === over.id,)

    if (activeIndex === -1 || overIndex === -1) {
      debugger
      throw new Error("---- WHY NO INDEXES?")
      // return
    }
    // arrayMove: dnd-kit이 제공하는 배열 재정렬 유틸리티 함수
    // 배열 내에서 항목의 위치를 변경합니다
    // 재정렬된 항목들로 상태 업데이트
    const newActiveArray = arrayMove(activeArray, activeIndex, overIndex)
    debugger
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
    </DndContext>
  )
}

export default DndProvider