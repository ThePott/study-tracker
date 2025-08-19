// import axios from "axios"
// import { useEffect } from "react"
// import { CompletedDict, ProgressData, StatusDict } from "../shared/interfaces/_progressInterfaces"
// import useBoundStore from "../shared/store"
// // 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다


// const getProgressArray = async (
//   studentId: string,
//   setProgressArrayFromDict: (progressArray: ProgressData[]) => void,
//   setInitialStatusDict: (progressArray: ProgressData[]) => void,
//   setInitialCompletedDict: (progressArray: ProgressData[]) => void
// ) => {
//   if (!studentId) { return }
//   // const url = `/student/${studentId}/progress`
//   const url = `/progress/student/${studentId}`
//   const response = await axios.get(url)

//   const progressArray = response.data
//   setProgressArrayFromDict(progressArray)
//   setInitialStatusDict(progressArray)
//   setInitialCompletedDict(progressArray)
// }

// export const useProgressGet = () => {
//   const student = useBoundStore((state) => state.selectedStudent)
//   const studentId = student?.studentId
//   const setProgressArrayFromDict = useBoundStore((state) => state.setProgressArrayFromDict)
//   const setInitialStatusDict = useBoundStore((state) => state.setInitialStatusDict)
//   const setInitialCompletedDict = useBoundStore((state) => state.setInitialCompletedDict)

//   useEffect(() => {
//     if (!studentId) { return }
//     getProgressArray(studentId, setProgressArrayFromDict, setInitialStatusDict, setInitialCompletedDict)
//   }, [student])
// }

// const patchProgressStatus = async (studentId: string, editedStatusDict: StatusDict) => {
//   if (!studentId) { return }
//   const url = `/student/${studentId}/progress/in-progress-status`
//   const response = await axios.patch(url, {
//     inProgressStatusDict: editedStatusDict
//   })
//   console.log("---- response:", response)
// }

// /** MUST be called at ProgressPage ONLY 
//  * 
//  * ---- 사실은 요약 페이지에서 사용돼야 함 ----
// */
// export const useAutoSaveInProgressStatus = () => {
//   const student = useBoundStore((state) => state.selectedStudent)
//   const studentId = student?.studentId
//   const editedStatusDict = useBoundStore((state) => state.editedStatusDict)
//   const mergeStatusToInitial = useBoundStore((state) => state.mergeStatusToInitial)

//   useEffect(() => {
//     if (!studentId) { return }
//     if (Object.values(editedStatusDict).length === 0) { return }

//     const timeoutId = setTimeout(() => {
//       console.log("---- want to save now:", editedStatusDict)
//       patchProgressStatus(studentId, editedStatusDict)
//       mergeStatusToInitial()
//     }, 2000)

//     return () => clearTimeout(timeoutId)
//   }, [editedStatusDict])
// }

// const patchCompleted = async (studentId: string, editedCompletedDict: CompletedDict) => {
//   if (!studentId) { return }
//   const url = `/student/${studentId}/progress/completed`
//   const response = await axios.patch(url, {
//     completedDict: editedCompletedDict
//   })
//   console.log("---- response:", response)
// }

// /** MUST be called at ProgressPage ONLY */
// export const useAutoSaveCompleted = () => {
//   const student = useBoundStore((state) => state.selectedStudent)
//   const studentId = student?.studentId
//   const editedCompletedDict = useBoundStore((state) => state.editedCompletedDict)
//   const mergeCompletedToInitial = useBoundStore((state) => state.mergeCompletedToInitial)

//   useEffect(() => {
//     if (!studentId) { return }
//     if (Object.values(editedCompletedDict).length === 0) { return }

//     const timeoutId = setTimeout(() => {
//       console.log("---- saving completed now:", editedCompletedDict)
//       patchCompleted(studentId, editedCompletedDict)
//       mergeCompletedToInitial()
//     }, 2000)

//     return () => clearTimeout(timeoutId)
//   }, [editedCompletedDict])
// }