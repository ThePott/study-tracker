import { StateCreator } from "zustand/vanilla"
import { BoundState } from "../interfaces"
import { ReviewCheck, ReviewCheckSlice, ReviewCheckStatusDict, ReviewCheckStatusInfoDict } from "../interfaces/_reviewCheckInterfaces"

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
                page: reviewCheck.questionPage,
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
    addToRecentTwo(reviewCheck) {
        set((state) => {
            const initial = state.initialReviewCheckStatusDict
            const multiSelectedReviewCheckStatusDict = { ...state.multiSelectedReviewCheckStatusDict }

            const length = state.recentTwo.length
            const recentTwo: number[] = length === 0 ? [reviewCheck.id] : [state.recentTwo[length - 1], reviewCheck.id]

            const minId = Math.min(...recentTwo)
            const maxId = Math.max(...recentTwo)

            for (let reviewCheckId = minId; reviewCheckId <= maxId; reviewCheckId++) {
                if (initial[reviewCheckId].status === state.changeTo) {
                    delete multiSelectedReviewCheckStatusDict[reviewCheckId]
                } else {
                    const newInfo = state.initialReviewCheckStatusDict[reviewCheckId]
                    multiSelectedReviewCheckStatusDict[reviewCheckId] = { ...newInfo, status: state.changeTo } as ReviewCheckStatusInfoDict
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
