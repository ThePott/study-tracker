import axios from "axios"
import { useState, useEffect } from "react"
import { BookData } from "@/src/_interfaces/bookInterfaces"
import { CompletedStatus } from "@/src/_interfaces/progressInterfaces"

// Custom hook for API calls
/** API  */
const useOneBook = (bookId: string) => {
    const [book, setBook] = useState<BookData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDataArray = async () => {
            try {
                setLoading(true)
                const url = `http://localhost:3030/book/${bookId}`
                const response = await axios.get(url)
                setBook(response.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchDataArray()
    }, [bookId])

    return { book, loading, error }
}

const useUpdateProgressCompleted = (progressId: string) => {
    // const [complet, setBook] = useState<BookData | null>(null)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState(null)

    const updateProgressCompleted = async (completed: CompletedStatus) => {
        try {
            setLoading(true)
            setError(null)
            const url = `http://localhost:3030/progress/${progressId}`
            const _ = await axios.patch(url, { completed })
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { updateProgressCompleted, isLoading, error }
}

export { useOneBook, useUpdateProgressCompleted }