import { create } from "zustand";
import { BoundState } from "../interfaces";
import createManagementSlice from "./managementStore";
import createProgressSlice from "./progressStore";
import createReviewCheckSlice from "./reviewCheckStore";

const useBoundStore = create<BoundState>()((...a) => ({
  ...createManagementSlice(...a),
  ...createProgressSlice(...a),
  ...createReviewCheckSlice(...a),
}))

export default useBoundStore