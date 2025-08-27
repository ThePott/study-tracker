import useBoundStore from "@/src/shared/store"
import React from "react"

const BookSection = () => {
    const reviewCheckGroupedByBook = useBoundStore((state) => state.reviewCheckGroupedByBook)
    const bookTitleArray = Object.keys(reviewCheckGroupedByBook)
    return <div>{JSON.stringify(bookTitleArray)}</div>
}

export default BookSection
