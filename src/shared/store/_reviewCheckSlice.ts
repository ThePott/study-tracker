import { StateCreator } from "zustand/vanilla"
import { BoundState } from "../interfaces"
import { ReviewCheck, ReviewCheckSlice, ReviewCheckStatusDict } from "../interfaces/_reviewCheckInterfaces"

const createReviewCheckSlice: StateCreator<BoundState, [], [], ReviewCheckSlice> = (set) => ({
    reviewCheckGroupedByBook: {},
    setReviewCheckGroupedByBook(reviewCheckGroupedByBook) {
        const bookValueArray = Object.values(reviewCheckGroupedByBook)
        const flatRevieCheckArray = bookValueArray.reduce((acc: ReviewCheck[], cur) => {
            const pageValueArrayArray = Object.values(cur)
            const flat = pageValueArrayArray.flat()
            acc.push(...flat)
            return acc
        }, [])

        const initialReviewCheckStatusDict = flatRevieCheckArray.reduce((acc: ReviewCheckStatusDict, reviewCheck) => {
            acc[reviewCheck.id] = {
                status: reviewCheck.status,
                page: reviewCheck.questionPage
            }
            return acc
        }, {})
        set({ reviewCheckGroupedByBook, initialReviewCheckStatusDict })
    },

    selectedBookTitle: null,
    setSelectedBookTitle(selectedBookTitle) {
        set({ selectedBookTitle })
    },

    recentTwo: [],
    addToRecentTwo(reviewCheckId) {
        set((state) => {
            const initial = state.initialReviewCheckStatusDict
            const multiSelectedReviewCheckStatusDict = { ...state.multiSelectedReviewCheckStatusDict }

            const length = state.recentTwo.length
            const recentTwo = length === 0 ? [reviewCheckId] : [state.recentTwo[length - 1], reviewCheckId]

            const minId = Math.min(...recentTwo)
            const maxId = Math.max(...recentTwo)

            for (let i = minId; i <= maxId; i++) {
                if (initial[i].status === state.changeTo) {
                    delete multiSelectedReviewCheckStatusDict[i]
                } else {
                    multiSelectedReviewCheckStatusDict[i].status = state.changeTo
                }
            }

            return { recentTwo, multiSelectedReviewCheckStatusDict }
        })
    },

    changeTo: "CORRECT",
    setChangeTo(changeTo) {
        set({ changeTo })
    },

    initialReviewCheckStatusDict: {},
    editedReviewCheckStatusDict: {},
    multiSelectedReviewCheckStatusDict: {},
})

export default createReviewCheckSlice
