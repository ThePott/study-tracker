import { create } from "zustand";
import { BoundState } from "../interfaces";
import createManagementSlice from "./_managementSlice";
import createProgressSlice from "./_progressSlice";
import createReviewCheckSlice from "./_reviewCheckSlice";
import { createLoginSlice } from "./_loginSlice";

const useBoundStore = create<BoundState>()((...a) => ({
  ...createManagementSlice(...a),
  ...createProgressSlice(...a),
  ...createReviewCheckSlice(...a),
  ...createLoginSlice(...a),
}))

export default useBoundStore