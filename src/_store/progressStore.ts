import { ProgressState } from "../_interfaces/progressInterfaces";
import { create } from "zustand";

const useProgressStore = create<ProgressState>()((set) => ({
    progressArray: [],
    setProgressArray(progressArray) { set({ progressArray }) },

    activeProgress: null,
    setActiveProgress(activeProgress) { set({ activeProgress }) },

    updateProgress(progress) {
        set((state) => {

            const newProgressArray = state.progressArray.map(
                (el) => el._id === progress._id ? progress : el)
            return {progressArray: newProgressArray}
        })
    },
}))

export default useProgressStore