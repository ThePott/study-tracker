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

export { useReviewCheckMany }
