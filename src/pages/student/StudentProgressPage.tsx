import { ProgressData } from '@/src/_interfaces/_progressInterfaces'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProgressInBook from '@/src/features/progress/StudentProgressInBook'

// Custom hook for API calls
const useStudentProgress = (studentId: string) => {
  const [dataArray, setDataArray] = useState<ProgressData[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDataArray = async () => {
      try {
        setLoading(true)
        const url = `http://localhost:3030/student/${studentId}/progress`
        const response = await axios.get(url)
        setDataArray(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDataArray()
  }, [studentId])

  return { dataArray, loading, error }
}

// Component using the custom hook
const StdProgressPage = () => {
  const studentId = "68494394d9f33f23de4513c5"
  const { dataArray, loading, error } = useStudentProgress(studentId)
  if (!dataArray) { return null }

  const bookIdArray: string[] = []
  const categorizedObject = {}

  for (const data of dataArray) {
    const { bookId } = data

    if (!bookIdArray.includes(bookId)) {
      bookIdArray.push(bookId)
      categorizedObject[bookId] = []
    }

    categorizedObject[bookId].push(data)
  }

  const entryArray: [string, ProgressData[]][] = Object.entries(categorizedObject)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='flex'>
      {entryArray.map((entry) => <ProgressInBook key={JSON.stringify(entry)} bookId={entry[0]} dataArray={entry[1]} />)}
    </div>
  )
}

export default StdProgressPage
