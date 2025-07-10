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
  })
)

export default useReviewCheckStore