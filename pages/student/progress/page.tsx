import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Custom hook for API calls
const useStudentProgress = (studentId: string) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const url = `http://localhost:3030/student/${studentId}/progress`
        const response = await axios.get(url)
        setData(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [studentId])
  
  return { data, loading, error }
}

// Component using the custom hook
const StdProgressPage = () => {
  const studentId = "68494394d9f33f23de4513c5"
  const { data, loading, error } = useStudentProgress(studentId)
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      <h1>Student Progress Page</h1>
      {data && <div>{JSON.stringify(data, null, 2)}</div>}
    </div>
  )
}

export default StdProgressPage