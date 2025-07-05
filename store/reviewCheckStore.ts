import { CheckboxStatus, EditedIdStatusDict, ReviewCheckData } from "@/interfaces/reviewCheckInterfaces"
import { create } from "zustand"
import { ApiResponse, ResponseStatus } from "@/interfaces/commonInterfaces"

// FOLD LEVEL 3

interface ReviewCheckState {
  reviewCheckArray: ReviewCheckData[],
  setReviewCheckArray: (newArray: ReviewCheckData[]) => void,
  updateReviewCheckArray: (editedIdStatusDictArray: EditedIdStatusDict[]) => void,

  editedIdStatusDictArray: EditedIdStatusDict[],
  setEditedIdStatusDictArray: (editedIdStatusDictArray: EditedIdStatusDict[]) => void,
  updateOneEditedIdStatusDictArray: (status: CheckboxStatus, reviewCheck: ReviewCheckData) => void,

  response: ApiResponse | null,
  setResponse: (status: ResponseStatus, message: string | null) => void,
}

const useReviewCheckStore = create<ReviewCheckState>()(
  (set) => ({
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
    setEditedIdStatusDictArray(editedIdStatusDictArray) { set({ editedIdStatusDictArray }) },
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

        return { editedIdStatusDictArray: copiedArray } // 채워 넣어야
      })
    },

    response: null,
    setResponse(status, message) { set({ response: { status, message } }) }
  })
)

export default useReviewCheckStore