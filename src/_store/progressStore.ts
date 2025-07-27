import { ProgressState } from "../_interfaces/progressInterfaces";
import { create } from "zustand";

const useProgressStore = create<ProgressState>()((set) => ({
    progressArray: [],
    setProgressArray(progressArray) { set({ progressArray }) },

    activeProgress: null,
    setActiveProgress(activeProgress) { set({ activeProgress }) },
}))

export default useProgressStore