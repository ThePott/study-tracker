import { InstructorState } from "@/interfaces/InstructorInterfaces";
import { create } from "zustand";

const useInstructorStore = create<InstructorState>()((set) => ({
    studentArray: [],
    setStudentArray(studentArray) { set({ studentArray }) },

    selectedStudent: null,
    setSelectedStudent(selectedStudent) { set({ selectedStudent }) },

}))

export default useInstructorStore