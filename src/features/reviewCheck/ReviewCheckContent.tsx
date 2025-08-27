import useBoundStore from "@/src/shared/store"
import BookSection from "./BookSection"
import CheckboxSection from "./CheckboxSection"

const ReviewCheckContent = () => {
    const selectedBookTitle = useBoundStore((state) => state.selectedBookTitle)
    
    switch (selectedBookTitle === null) {
        case true:
            return <BookSection />
        case false:
            return <CheckboxSection />
    }
}

export default ReviewCheckContent
