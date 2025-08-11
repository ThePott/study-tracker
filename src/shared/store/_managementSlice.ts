import { StateCreator } from "zustand";
import { BoundState, ManagementSlice } from "../interfaces";

const createManagementSlice: StateCreator<BoundState, [], [], ManagementSlice> = (set) => ({
    studentArray: [],
    setStudentArray(studentArray) { set({ studentArray }) },

    selectedStudent: null,
    setSelectedStudent(selectedStudent) { set({ selectedStudent }) },
})

export default createManagementSlice