import axios, { AxiosResponse } from "axios"
import { Student } from "@/src/shared/interfaces/_instructorInterfaces"
// constants 폴더에 두는 게 더 좋을 것
// env를 환경별로 만들어서 dev / build, env를 상황에 맞게 참조하도록 분리

// 로그인 관련 --- 토큰 만료되면 아예 로그아웃시킴
// 리프레시 토큰 있으면 -> 만료 상태 코드 오면 -> 리프레시 토큰으로 재발급 받음
axios.defaults.baseURL = "http://localhost:3030"

/** do nothing */
export const handleSuccess = (response: AxiosResponse<any, any>) => {
    if (response.data.length === undefined) {
        console.log("---- SUCCESS data:", Object.keys(response.data).length)
    } else {
        console.log("---- SUCCESS data:", response.data.length)
    }
    return response
}

export const handleFailure = (error: any) => {
    console.error(
        "---- ERROR OCCURRED:",
        error.response?.status ? error.response.status : error
    )

    return Promise.reject(error)
}

// Add a response interceptor
axios.interceptors.response.use(handleSuccess, handleFailure)
// 보통 유틸은 작은 일만 함 axios는 유틸함수보다는 비동기 요청이다보니 큰 부분
// axios로 빼거나 service로 빼거나
// ---- 서버에 요청하는 거니 api 폴더 등으로 분기가 되어야
const getStudentArray = async (): Promise<Student[]> => {
    const response = await axios.get("/student")

    const studentArray: Student[] = response.data.reduce(
        (acc: Student[], cur: any) => {
            const { _id, ...rest } = cur
            const student = { ...rest, studentId: cur._id }
            return [...acc, student]
        },
        []
    )

    return studentArray
}

export { getStudentArray }
