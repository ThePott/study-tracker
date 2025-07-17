import { ApiResponse } from "@/interfaces/commonInterfaces"
import { CheckboxStatus, EditedIdStatusDict, ReviewCheckData } from "@/interfaces/reviewCheckInterfaces"
import { create } from "zustand"

// FOLD LEVEL 3
interface ReviewCheckState {
  // ---- fetch releated -----
  groupedBookObject: any,
  bookTitleArray: string[] | null,
  selectedBookTitle: string | null,
  setGroupedBookObject: (groupedBookObject: any) => void,
  setBookTitleArray: (bookTitleArray: string[] | null) => void,
  setSelectedBookTitle: (selectedBookTitle: string) => void,

  reviewCheckArray: ReviewCheckData[],
  setReviewCheckArray: (newArray: ReviewCheckData[]) => void,
  updateReviewCheckArray: (editedIdStatusDictArray: EditedIdStatusDict[]) => void,

  editedIdStatusDictArray: EditedIdStatusDict[],
  /** 얘보단 아래 걸 더 많이 쓸 거 같은데 맞네 비울 때만 쓴다 */
  setEditedIdStatusDictArray: (editedIdStatusDictArray: EditedIdStatusDict[]) => void,
  /** 내 status 바뀜 -> 에디티드에 있는지 확인 후 갱신  */
  updateOneEditedIdStatusDictArray: (status: CheckboxStatus, reviewCheck: ReviewCheckData) => void,

  response: ApiResponse | null,
  setResponse: (response: ApiResponse | null) => void,
  hideResponseSnackbar: () => void,
  startResponseLoading: () => void,

  changeTo: CheckboxStatus,
  setChangeTo: (changeTo: CheckboxStatus) => void,

  isMultiSelecting: boolean,
  setIsMultiSelecting: (isMultiSelecting: boolean) => void,

  recentTwoIndexes: number[],
  appendToRecentTwoIndexes: (index: number) => void,
  clearRecentTwoIndexes: () => void,

  statusArray: CheckboxStatus[],
  updateStatusArray: () => void,
  updateOneOfStatusArray: (index: number) => void,
}

// Fold Levl 3
const useReviewCheckStore = create<ReviewCheckState>()(
  (set) => ({
    groupedBookObject: null,
    bookTitleArray: null,
    selectedBookTitle: null,
    setGroupedBookObject(groupedBookObject) { set({ groupedBookObject }) },
    setBookTitleArray(bookTitleArray) { set({ bookTitleArray }) },
    setSelectedBookTitle(selectedBookTitle) { set({ selectedBookTitle }) },

    reviewCheckArray: [],
    setReviewCheckArray(reviewCheckArray) { set({ reviewCheckArray }) },
    updateReviewCheckArray(editedIdStatusDictArray) {
      set((state) => {
        const copiedArray = [...state.reviewCheckArray]
        for (const reviewCheck of copiedArray) {
          const dict = editedIdStatusDictArray.find((tempDict) => tempDict.reviewCheckId === reviewCheck._id)
          if (!dict) { continue }

          reviewCheck.status = dict.status
        }
        return { reviewCheckArray: copiedArray }
      })
    },

    editedIdStatusDictArray: [],
    /** 얘보단 아래 걸 더 많이 쓸 거 같은데 맞네 비울 때만 쓴다 */
    setEditedIdStatusDictArray(editedIdStatusDictArray) { set({ editedIdStatusDictArray }) },
    /** 내 status 바뀜 -> 에디티드에 있는지 확인 후 갱신  */
    updateOneEditedIdStatusDictArray(status, reviewCheck) {
      set((state) => {
        const copiedArray = [...state.editedIdStatusDictArray]
        const indexInPrevArray = copiedArray.findIndex((dict) => dict.reviewCheckId === reviewCheck._id)

        if (indexInPrevArray !== -1) {
          copiedArray.splice(indexInPrevArray, 1)
        }

        if (status !== reviewCheck.status) {
          copiedArray.push({ reviewCheckId: reviewCheck._id, status })
        }

        return { editedIdStatusDictArray: copiedArray }
      })
    },

    response: null,
    setResponse(response) { set({ response }) },
    hideResponseSnackbar() {
      set((state) => ({ response: { ...state.response, doOpenSnackbar: false } }))
    },
    startResponseLoading() {
      set((state) => {
        if (!state.response) { return { response: { status: "IS_LOADING", message: null, doOpenSnackbar: false } } }

        if (state.response.status === "IS_LOADING") { return state }

        return { response: { ...state.response, status: "IS_LOADING" } }
      })
    },

    changeTo: "CORRECT",
    setChangeTo(changeTo) { set({ changeTo }) },

    isMultiSelecting: true,
    setIsMultiSelecting(isMultiSelecting) { set({ isMultiSelecting }) },

    recentTwoIndexes: [],
    appendToRecentTwoIndexes(index) {
      set((state) => {
        const copiedIndexes = [...state.recentTwoIndexes]

        // 날 두 번 탭하면 끔
        if (copiedIndexes.at(-1) === index) {
          copiedIndexes.pop()
          return { recentTwoIndexes: copiedIndexes }
        }

        // 그 외에는 2개까지만 유지하며 추가
        if (copiedIndexes.length >= 2) {
          copiedIndexes.shift()
        }
        copiedIndexes.push(index)

        console.log("---- recent two:", copiedIndexes)
        return { recentTwoIndexes: copiedIndexes }
      })
    },
    clearRecentTwoIndexes() { set({ recentTwoIndexes: [] }) },

    statusArray: [],
    updateStatusArray() {
      set((state) => {
        if (!state.reviewCheckArray) {
          return { statusArray: [] }
        }

        // !!!!----TODO 한 번 만들고 재사용해도 됨. useRef? ----!!!!
        const initialStatusArray = state.reviewCheckArray.map((reviewCheck) => reviewCheck.status)

        if (state.recentTwoIndexes.length === 0) {
          return { statusArray: initialStatusArray }
        }

        const copiedInitialStatusArray = [...initialStatusArray]

        const startIndex = Math.min(...state.recentTwoIndexes)
        const spliceLength = Math.max(...state.recentTwoIndexes) - startIndex + 1

        copiedInitialStatusArray.splice(startIndex, spliceLength, ...Array(spliceLength).fill(state.changeTo))

        return { statusArray: copiedInitialStatusArray }
      })
    },
    updateOneOfStatusArray(index) {
      set((state) => {
        const updatedArray = state.statusArray.map((tempStatus, tempIndex) => (tempIndex === index ? state.changeTo : tempStatus))
        return { statusArray: updatedArray }
      })
    },
  })
)

export default useReviewCheckStore