import axios, { AxiosResponse } from "axios";
import { Student } from "../_interfaces/InstructorInterfaces";

axios.defaults.baseURL = 'http://localhost:3030';

/** do nothing */
const handleSuccess = (response: AxiosResponse<any, any>) => {
    console.log("---- SUCCESS data:", response.data.length)
    return response
}


const handleFailure = (error: any) => {
    console.error("---- ERROR OCCURRED:", error.response.status)

    return Promise.reject(error)
}

// Add a response interceptor
axios.interceptors.response.use(handleSuccess, handleFailure)

const getStudentArray = async (): Promise<Student[]> => {
    const response = await axios.get("/student")

    // debugger
    const studentArray: Student[] = response.data.reduce(
        (acc: Student[], cur: any) => {
            const { _id, ...rest } = cur;
            const student = { ...rest, studentId: cur._id }
            return [...acc, student]
        },
        []
    )

    return studentArray
}

export { getStudentArray }