import axios from "axios"
import { handleFailure, handleSuccess } from "./axiosUtils"

const axiosNeon  = axios.create({
    baseURL: "http://localhost:3456",
})
axiosNeon.interceptors.response.use(handleSuccess, handleFailure)

export default axiosNeon