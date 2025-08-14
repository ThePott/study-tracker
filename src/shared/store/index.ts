import { create } from "zustand";
import { BoundState } from "../interfaces";
import createManageSlice from "./_manageSlice";
import createProgressSlice from "./_progressSlice";
import createReviewCheckSlice from "./_reviewCheckSlice";
import createLoginSlice from "./_loginSlice";
import { persist, createJSONStorage } from 'zustand/middleware'
import createApiSlice from "./_apiSlice";


const useBoundStore = create<BoundState>()(
  persist(
    (...a) => ({
      ...createManageSlice(...a),
      ...createProgressSlice(...a),
      ...createReviewCheckSlice(...a),
      ...createLoginSlice(...a),
      ...createApiSlice(...a),
    }),
    {
      name: 'study-tracker-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize(state) {
        return { user: state.user }
      }
    },
  ))

export default useBoundStore