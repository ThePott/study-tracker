// ======== DO NOT REFERENCE index.ts ========
// ======== CIRCULAR DEPENDENCY ========

import type { ManagementSlice } from './_instructorInterfaces'
import type { ProgressSlice } from './_progressInterfaces'
import type { ReviewCheckSlice } from './_reviewCheckInterfaces'

export type BoundState = ManagementSlice & ProgressSlice & ReviewCheckSlice