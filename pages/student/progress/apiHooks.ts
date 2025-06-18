import axios from "axios"
import { useState, useEffect } from "react"
import { BookData } from "../_interfaces/student-interfaces"

// Custom hook for API calls
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

export { useOneBook }