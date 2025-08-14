import { StateCreator } from "zustand";
import { ApiSlice, BoundState } from "../interfaces";

const createApiSlice: StateCreator<BoundState, [], [], ApiSlice> = (set) => ({
    apiInfo: null,
    setApiInfo(apiInfo) { set({ apiInfo }) },
})

export default createApiSlice