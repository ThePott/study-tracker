import { StateCreator } from "zustand/vanilla"
import { BoundState } from "../interfaces"
import { ReviewCheckSlice } from "../interfaces/_reviewCheckInterfaces"

const createReviewCheckSlice: StateCreator<BoundState, [], [], ReviewCheckSlice> = (set) => ({
    reviewCheckArrayInDict: {},
    setReviewCheckArrayInDict(reviewCheckArrayInDict) {
        set({ reviewCheckArrayInDict })
    },
    
})

export default createReviewCheckSlice
