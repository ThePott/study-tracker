// ======== DO NOT REFERENCE index.ts ========
// ======== CIRCULAR DEPENDENCY ========

import type { ApiSlice } from "./_apiInterfaces"
import type { ManageSlice } from "./_instructorInterfaces"
import type { LoginSlice } from "./_loginInterfaces"
import type { ProgressSlice } from "./_progressInterfaces"
import { ReviewCheckSlice } from "./_reviewCheckInterfaces"
import type { ReviewCheckSlice as OLDReviewCheckSlice } from "./OLD_reviewCheckInterfaces"

export type BoundState = ManageSlice & ProgressSlice & LoginSlice & ApiSlice & ReviewCheckSlice
