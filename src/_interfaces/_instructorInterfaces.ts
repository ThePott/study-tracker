export interface Student {
  studentId: string
  name: string
}

export interface ManagementSlice {
  studentArray: Student[]
  setStudentArray: (studentArray: Student[]) => void

  selectedStudent: Student
  setSelectedStudent: (selectedStudent: Student | null) => void
}
