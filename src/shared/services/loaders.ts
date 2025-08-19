import axiosNeon from "./neon"

export const loadStudentArray = async () => {
    const response = await axiosNeon.get("/manage")
    return response.data
}
