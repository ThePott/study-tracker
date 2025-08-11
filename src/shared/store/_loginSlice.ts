import { StateCreator } from "zustand";
import { BoundState } from "../interfaces";
import { LoginSlice } from "../interfaces/_loginInterfaces";

export const createLoginSlice: StateCreator<BoundState, [], [], LoginSlice> = (set) => ({
    user: null,
    setUser(user) { set({ user }) },
})