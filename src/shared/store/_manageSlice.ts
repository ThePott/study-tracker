import { StateCreator } from "zustand"
import { BoundState, ManageSlice } from "../interfaces"

const createManageSlce: StateCreator<BoundState, [], [], ManageSlice> = (
    set
) => ({
    userArray: [],
    setUserArray(userArray) {
        set({ userArray })
    },

    selectedUser: null,
    setSelectedUser(selectedUser) {
        set({ selectedUser })
    },
    // studentArray: [],
    // setStudentArray(studentArray) { set({ studentArray }) },

    // selectedStudent: null,
    // setSelectedStudent(selectedStudent) { set({ selectedStudent }) },
})

export default createManageSlce
