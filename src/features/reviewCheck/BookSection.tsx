import useBoundStore from "@/src/shared/store"
import BookBox from "./OLD_BookBox"

const BookSection = () => {
    const reviewCheckGroupedByBook = useBoundStore((state) => state.reviewCheckGroupedByBook)
    const bookTitleArray = Object.keys(reviewCheckGroupedByBook)
    
    return <div>{bookTitleArray.map((bookTitle) => <BookBox key={bookTitle} bookTitle={bookTitle} />)}</div>
}

export default BookSection
