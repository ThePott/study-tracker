import { StateCreator } from "zustand";
import { BoundState, Progress, ProgressSlice } from "../interfaces";
import { findNextCompleted } from "../utils";
// 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다

const createProgressSlice: StateCreator<BoundState, [], [], ProgressSlice> = (set) => ({
  progressArrayInDict: {},
  /** const groupedProgressArray = Object.groupBy(progressArray, (progress) => progress.bookTitle) */
  setProgressArrayInDict(progressArrayInDict) { set({ progressArrayInDict }) },

  initialCompletedDict: {},
  setInitialCompletedDict(progressArrayInDict) {
    set(() => {
      const flatArray = Object.values(progressArrayInDict).flat()
      const initialCompletedDict = flatArray.reduce((acc, cur) => {
        acc[cur.id] = cur.completed
        return acc
      }, {})

      return { initialCompletedDict: initialCompletedDict }
    })
  },

  editedCompletedDict: {},
  mergeCompletedToInitial() {
    set((state) => {
      return { initialCompletedDict: { ...state.initialCompletedDict, ...state.editedCompletedDict }, editedCompletedDict: {} }
    })
  },
  /** 두 파트 구성
   * 
   * 1. 클릭 -> 완료 변경 -> progress array update
   * 
   * 2. -> initial, edited 보면서 edited 변경
   */
  changeCompleted(progress) {
    set((state) => {
      const key = progress.id
      const value = findNextCompleted(progress)

      const newProgress = { ...progress, completed: value } as Progress
      const progressArrayInDict = { ...state.progressArrayInDict }
      progressArrayInDict[progress.bookTitle] = progressArrayInDict[progress.bookTitle].map((el) => el.id === progress.id ? newProgress : el)

      // 이전 변경상태랑 달라지지 않았으니 유지
      if (state.editedCompletedDict[key] === value) {
        return { progressArrayInDict }
      }

      // 최초로 돌아왔으면 edited에서 삭제
      if (state.initialCompletedDict[key] === value) {
        const { [key]: _removedValue, ...rest } = state.editedCompletedDict
        return { editedCompletedDict: rest, progressArrayInDict }
      }

      // 최초랑 다르면 새로 추가
      return { editedCompletedDict: { ...state.editedCompletedDict, [key]: value }, progressArrayInDict }
    })
  },

  initialStatusDict: {},
  setInitialStatusDict(progressArrayInDict) {
    set(() => {
      const flatArray = Object.values(progressArrayInDict).flat()
      const initialStatusDict = flatArray.reduce((acc, cur) => {
        acc[cur.id] = cur.inProgressStatus
        return acc
      }, {})
      return { initialStatusDict }
    })
  },

  editedStatusDict: {},
  updateInProgressStatus(bookTitle, id, inProgressStatus) {
    set((state) => {
      const progressArrayInDict = { ...state.progressArrayInDict }
      progressArrayInDict[bookTitle] = progressArrayInDict[bookTitle].map((el) => el.id === id ? { ...el, inProgressStatus } : el)

      return { progressArrayInDict }
    })
  },
  mergeStatusToInitial() {
    set((state) => {
      return { initialStatusDict: { ...state.initialStatusDict, ...state.editedStatusDict }, editedStatusDict: {} }
    })
  },

  activeProgress: null,
  setActiveProgress(activeProgress) { set({ activeProgress }) },

  updateProgress(progress) {
    set((state) => {
      const newDict = { ...state.progressArrayInDict }
      const targetArray = newDict[progress.bookTitle]

      if (!targetArray) { throw new Error("---- ERROR TO PARSE DICT BY PROGRESS!!!!") }
      newDict[progress.bookTitle] = newDict[progress.bookTitle].map((el) => el.id === progress.id ? progress : el)

      return { progressArrayInDict: newDict }
    })
  },

  doShowSkeleton: false,
  setDoShowSkeleton(doShowSkeleton) { set({ doShowSkeleton }) },
})

export default createProgressSlice