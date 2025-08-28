import axios from "axios"
import { handleFailure, handleSuccess } from "./axiosUtils"

const getBaseURL = () => {
    // if ((import.meta as any).PROD) {
    //     return "https://prod-study-tracker-api-sql-f600c502d1e4.herokuapp.com/"
    // }
    // return "http://localhost:3456"
    return "https://prod-study-tracker-api-sql-f600c502d1e4.herokuapp.com"
}

const axiosNeon = axios.create({
    baseURL: getBaseURL(),
})
axiosNeon.interceptors.response.use(handleSuccess, handleFailure)

export default axiosNeon
