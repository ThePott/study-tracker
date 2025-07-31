import { useCallback, useEffect } from "react"
import useProgressStore from "../_store/progressStore"
import axios from "axios"
import { CompletedStatus, completedStatusArray, ProgressData, StatusDict } from "../_interfaces/progressInterfaces"
import useInstructorStore from "../_store/instructorStore"
import { findNextCompleted } from "../_utils/simpleUtils"

// 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다


const getProgressArray = async (studentId: string, setProgressArray: (progressArray: ProgressData[]) => void, setInitialStatusDict: (progressArray: ProgressData[]) => void) => {
  if (!studentId) { return }
  const url = `/student/${studentId}/progress`
  const response = await axios.get(url)
  setProgressArray(response.data)
  setInitialStatusDict(response.data)
}

export const useProgressGet = () => {
  const student = useInstructorStore((state) => state.selectedStudent)
  const studentId = student?.studentId
  const setProgressArray = useProgressStore((state) => state.setProgressArray)
  const setInitialStatusDict = useProgressStore((state) => state.setInitialStatusDict)

  useEffect(() => {
    if (!studentId) { return }
    getProgressArray(studentId, setProgressArray, setInitialStatusDict)
  }, [student])
}

const patchProgressStatus = async (studentId: string, editedStatusDict: StatusDict) => {
  if (!studentId) { return }
  const url = `/student/${studentId}/progress/in-progress-status`
  const response = await axios.patch(url, {
    inProgressStatusDict: editedStatusDict
  })
  console.log("---- response:", response)
}

/** MUST be called at ProgressPage ONLY */
export const useAutoSaveProgress = () => {
  const student = useInstructorStore((state) => state.selectedStudent)
  const studentId = student?.studentId
  const editedStatusDict = useProgressStore((state) => state.editedStatusDict)
  const mergeStatusToInitial = useProgressStore((state) => state.mergeStatusToInitial)

  useEffect(() => {
    if (!studentId) { return }
    if (Object.values(editedStatusDict).length === 0) { return }

    const timeoutId = setTimeout(() => {
      console.log("---- want to save now:", editedStatusDict)
      patchProgressStatus(studentId, editedStatusDict)
      mergeStatusToInitial()
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [editedStatusDict])
}
