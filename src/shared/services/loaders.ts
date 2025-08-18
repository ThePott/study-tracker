import axiosNeon from "./neon"

export const loadStudentArray = async () => {
    const response = await axiosNeon.get("/manage")
    return response.data
}

// export const loadProgress = async () => {
//     const { selectedUser, setApiInfo, setProgressArrayInDict } = useBoundStore.getState()
//     const 
    
//     if (!selectedUser) { return }

//     const apiInfo: ApiInfo = {
//         additionalUrl: `/progress/student/${selectedUser.id}`,
//         method: "GET",
//         responseHandler: setProgressArrayInDict,
//         loadingSetter:
//     }

//     await requestThenResponse(apiInfo, setApiInfo, )
//     return
// }