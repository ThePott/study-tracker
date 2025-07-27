import { useEffect } from "react"
import useProgressStore from "../_store/progressStore"
import axios from "axios"

// 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다


export const useProgressGet = (studentId: string) => {
  // if (!studentId) {return }
  const setProgressArray = useProgressStore((state) => state.setProgressArray)

  useEffect(() => {
    const fetchDataArray = async () => {
      try {
        const url = `/student/${studentId}/progress`
        const response = await axios.get(url)
        setProgressArray(response.data)
      } catch (error) {
        console.error("---- ERROR OCCURRED:", error)
      } finally {
        // setLoading(false)
      }
    }

    fetchDataArray()
  }, [studentId])
}