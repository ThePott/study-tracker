import { ProgressState } from "../_interfaces/progressInterfaces";
import { create } from "zustand";

const useProgressStore = create<ProgressState>()((set) => ({
  progressArray: [],
  setProgressArray(progressArray) { set({ progressArray }) },

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
}))

export default useProgressStore