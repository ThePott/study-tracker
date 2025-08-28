import { StateCreator } from "zustand/vanilla"
import { BoundState } from "../interfaces"
import { ReviewCheck, ReviewCheckSlice, ReviewCheckStatusDict, ReviewCheckStatusInfoDict } from "../interfaces/_reviewCheckInterfaces"
import { isBetween } from "../utils/_mathUtils"

const handleSingleSelection = (get: () => BoundState, reviewCheck: ReviewCheck): Partial<BoundState> => {
    const initial = get().initialReviewCheckStatusDict

    const editedReviewCheckStatusDict = { ...get().editedReviewCheckStatusDict }

    if (initial[reviewCheck.id].status === get().changeTo) {
        if (editedReviewCheckStatusDict[reviewCheck.id]) {
            delete editedReviewCheckStatusDict[reviewCheck.id]
            return { editedReviewCheckStatusDict }
        }
        return get()
    }
    const newInfo = get().initialReviewCheckStatusDict[reviewCheck.id]
    editedReviewCheckStatusDict[reviewCheck.id] = { ...newInfo, status: get().changeTo } as ReviewCheckStatusInfoDict
    return { editedReviewCheckStatusDict }
}

const handleMultiSelection = (get: () => BoundState, reviewCheck: ReviewCheck): Partial<BoundState> => {
    const state = get()

    const multiSelectedReviewCheckStatusDict: ReviewCheckStatusDict = {}
    const length = state.recentTwo.length
    const recentTwo: number[] = length === 0 ? [reviewCheck.id] : [get().recentTwo[length - 1], reviewCheck.id]

    const minId = Math.min(...recentTwo)
    const maxId = Math.max(...recentTwo)

    for (let reviewCheckId = minId; reviewCheckId <= maxId; reviewCheckId++) {
        const newInfo = get().initialReviewCheckStatusDict[reviewCheckId]
        multiSelectedReviewCheckStatusDict[reviewCheckId] = { ...newInfo, status: state.changeTo } as ReviewCheckStatusInfoDict
    }
    return { recentTwo, multiSelectedReviewCheckStatusDict }
}

const createReviewCheckSlice: StateCreator<BoundState, [], [], ReviewCheckSlice> = (set, get) => ({
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

    changeTo: "CORRECT",
    setChangeTo(changeTo) {
        set({ changeTo })
    },

    initialReviewCheckStatusDict: {},
    editedReviewCheckStatusDict: {},
    multiSelectedReviewCheckStatusDict: {},
    mergeReviewCheckStatusToInitial() {
        const state = get()
        const initialReviewCheckStatusDict: ReviewCheckStatusDict = { ...state.initialReviewCheckStatusDict, ...state.editedReviewCheckStatusDict }
        const editedReviewCheckStatusDict = {}
        set({ initialReviewCheckStatusDict, editedReviewCheckStatusDict })
    },

    isMultiSelecting: true,
    toggleIsMultiSelecting() {
        const state = get()

        const prevIsMultiSelecting = state.isMultiSelecting
        const isMultiSelecting = !prevIsMultiSelecting

        if (!prevIsMultiSelecting) {
            set({ isMultiSelecting })
            return
        }

        const editedReviewCheckStatusDict = { ...state.editedReviewCheckStatusDict, ...state.multiSelectedReviewCheckStatusDict }
        const multiSelectedReviewCheckStatusDict = {}
        set({ isMultiSelecting, editedReviewCheckStatusDict, multiSelectedReviewCheckStatusDict })
    },

    recentTwo: [],
    handleCheckboxClick(reviewCheck) {
        const resultState = get().isMultiSelecting ? handleMultiSelection(get, reviewCheck) : handleSingleSelection(get, reviewCheck)
        set(resultState)
    },
})

export default createReviewCheckSlice
