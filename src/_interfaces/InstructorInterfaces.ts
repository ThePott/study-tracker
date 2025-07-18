interface Student {
  studentId: string
  name: string
}

interface InstructorState {
  studentArray: Student[]
  setStudentArray: (studentArray: Student[]) => void

  selectedStudent: Student
  setSelectedStudent: (selectedStudent: Student | null) => void
}

export type { Student, InstructorState }
