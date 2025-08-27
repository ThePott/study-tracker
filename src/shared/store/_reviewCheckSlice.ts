import { StateCreator } from "zustand/vanilla"
import { BoundState } from "../interfaces"
import { ReviewCheckSlice } from "../interfaces/_reviewCheckInterfaces"

const createReviewCheckSlice: StateCreator<BoundState, [], [], ReviewCheckSlice> = (set) => ({
    reviewCheckGroupedByBook: {},
    setReviewCheckGroupedByBook(reviewCheckGroupedByBook) {
        set({ reviewCheckGroupedByBook })
    },

    selectedBookTitle: null,
    setSelectedBookTitle(selectedBookTitle) {
        set({selectedBookTitle})
    },
    
})

export default createReviewCheckSlice
