import { User } from "./_loginInterfaces"

export interface Student {
    studentId: string
    name: string
}

export interface ManageSlice {
    userArray: User[]
    setUserArray: (userArray: User[]) => void

    selectedUser: User | null
    setSelectedUser: (selectedUser: User | null) => void

    // studentArray: Student[]
    // setStudentArray: (studentArray: Student[]) => void

    // selectedStudent: Student
    // setSelectedStudent: (selectedStudent: Student | null) => void
}
