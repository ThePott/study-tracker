import { StateCreator } from "zustand";
import { BoundState, ProgressData, ProgressSlice } from "../_interfaces";
import { findNextCompleted } from "../shared/utils/simpleUtils";
// 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다

const createProgressSlice: StateCreator<BoundState, [], [], ProgressSlice> = (set) => ({
  progressArray: [],
  setProgressArray(progressArray) { set({ progressArray }) },

  initialCompletedDict: {},
  setInitialCompletedDict(progressArray) {
    set(() => {
      const initialCompletedDict = progressArray.reduce((acc, cur) => {
        acc[cur._id] = cur.completed
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
      const key = progress._id
      const value = findNextCompleted(progress)

      const newProgress = { ...progress, completed: value } as ProgressData
      const progressArray = state.progressArray.map((el) => el._id === progress._id ? newProgress : el)

      // 이전 변경상태랑 달라지지 않았으니 유지
      if (state.editedCompletedDict[key] === value) {
        return { progressArray }
      }

      // 최초로 돌아왔으면 edited에서 삭제
      if (state.initialCompletedDict[key] === value) {
        const { [key]: _removedValue, ...rest } = state.editedCompletedDict
        return { editedCompletedDict: rest, progressArray }
      }

      // 최초랑 다르면 새로 추가
      return { editedCompletedDict: { ...state.editedCompletedDict, [key]: value }, progressArray }
    })
  },

  initialStatusDict: {},
  setInitialStatusDict(progressArray) {
    set(() => {
      const initialStatusDict = progressArray.reduce((acc, cur) => {
        acc[cur._id] = cur.inProgressStatus
        return acc
      }, {})
      return { initialStatusDict }
    })
  },

  editedStatusDict: {},
  handleStatusChange(progress) {
    set((state) => {
      const key = progress._id
      const value = progress.inProgressStatus

      // 이전 변경상태랑 달라지지 않았으니 유지
      if (state.editedStatusDict[key] === value) { return state }

      // 최초로 돌아왔으면 변경 취소
      if (state.initialStatusDict[key] === value) {
        const { [key]: _removedValue, ...rest } = state.editedStatusDict
        return { editedStatusDict: rest }
      }

      // 최초랑 다르면 새로 추가
      return { editedStatusDict: { ...state.editedStatusDict, [key]: value } }
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

      const newProgressArray = state.progressArray.map(
        (el) => el._id === progress._id ? progress : el)
      return { progressArray: newProgressArray }
    })
  },
})

export default createProgressSlice