import useBoundStore from "@/src/shared/store"
import BookBox from "./BookBox"

const BookSection = () => {
    const reviewCheckGroupedByBook = useBoundStore((state) => state.reviewCheckGroupedByBook)
    const bookTitleArray = Object.keys(reviewCheckGroupedByBook)
    
    return <div className="w-[604px] mx-auto">{bookTitleArray.map((bookTitle) => <BookBox key={bookTitle} bookTitle={bookTitle} />)}</div>
}

export default BookSection
