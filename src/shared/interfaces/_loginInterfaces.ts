export type Role = "INSTRUCTOR" | "STUDENT"

export interface User {
    id: number
    name: string
    role: Role
}

export interface LoginSlice {
    user: User | null
    setUser: (user: User | null) => void
}