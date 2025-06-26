import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ReviewCheckData } from '../../_interfaces/interfaces'

// Custom hook for API calls
const useReviewCheckMany = (studentId: string) => {
    const [reviewCheckArray, setReviewCheckArray] = useState<ReviewCheckData[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDataArray = async () => {
            try {
                setIsLoading(true)
                const url = `http://localhost:3030/review-check/${studentId}`
                const response = await axios.get(url)
                setReviewCheckArray(response.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDataArray()
    }, [studentId])

    return { reviewCheckArray, isLoading, error }
}

// const useUpdate = (progressId: string) => {
//     // const [complet, setBook] = useState<BookData | null>(null)
//     const [isLoading, setLoading] = useState<boolean>(false)
//     const [error, setError] = useState(null)
//
//     const updateProgressCompleted = async (completed: CompletedStatus) => {
//         try {
//             setLoading(true)
//             setError(null)
//             const url = `http://localhost:3030/progress/${progressId}`
//             const _ = await axios.patch(url, { completed })
//         } catch (error) {
//             setError(error.message)
//         } finally {
//             setLoading(false)
//         }
//     }
//
//     return { updateProgressCompleted, isLoading, error }
// }

export { useReviewCheckMany }
