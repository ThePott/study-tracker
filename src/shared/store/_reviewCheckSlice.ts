import { StateCreator } from "zustand/vanilla";
import { BoundState } from "../interfaces";
import { ReviewCheck, ReviewCheckSlice } from "../interfaces/_reviewCheckInterfaces";
import axiosNeon from "../services/neon";


const createReviewCheckSlice: StateCreator<BoundState, [], [], ReviewCheckSlice> = (set) => ({
    reviewCheckArray: [],
    setReviewCheckArray(reviewCheckArray) {
        set({reviewCheckArray})
    },

    async getReviewCheckArray(studentId) {
        const response = await axiosNeon.get(`/review-check/student/${studentId}`)
        const reviewCheckArray: ReviewCheck[] = response.data
        set({reviewCheckArray})
    },
})

export default createReviewCheckSlice