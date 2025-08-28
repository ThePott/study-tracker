import useBoundStore from "@/src/shared/store"
import CheckboxGroupedByPage from "./CheckboxGroupedByPage"
import { scrollbarStyle } from "@/src/shared/constants/style"
import { ReviewCheckStatusDict } from "@/src/shared/interfaces/_reviewCheckInterfaces"

const filterStatusDictByPage = (statusDict: ReviewCheckStatusDict, page: number): ReviewCheckStatusDict => {
    const filteredEntryArray = Object.entries(statusDict).filter((entry) => entry[1].page === page)
    const filteredDict = Object.fromEntries(filteredEntryArray)
    if (Object.values(filteredDict).length === 0) {
        debugger
    } else {
        // debugger
    }
    return filteredDict
}

const CheckboxBody = () => {
    const reviewCheckGroupedByBook = useBoundStore((state) => state.reviewCheckGroupedByBook)
    const selectedBookTitle = useBoundStore((state) => state.selectedBookTitle)
    const recentTwo = useBoundStore((state)=> state.recentTwo)
    const initialReviewCheckStatusDict = useBoundStore((state) => state.initialReviewCheckStatusDict)
    const editedReviewCheckStatusDict = useBoundStore((state) => state.editedReviewCheckStatusDict)
    const multiSelectedReviewCheckStatusDict = useBoundStore((state) => state.multiSelectedReviewCheckStatusDict)

    const statusDict: ReviewCheckStatusDict = {...initialReviewCheckStatusDict, ...editedReviewCheckStatusDict, ...multiSelectedReviewCheckStatusDict}
    if (!selectedBookTitle) {
        throw new Error("Checkbox Body But No Book Title")
    }

    const bookValue = reviewCheckGroupedByBook[selectedBookTitle]
    if (!bookValue) {
        throw new Error("No Value From Key Of Book Title")
    }

    const entryArray = Object.entries(bookValue)
    
    return (
        <div style={scrollbarStyle} className="flex flex-col gap-2 h-full overflow-x-hidden overflow-y-scroll">
            {entryArray.map((entry) => (
                <CheckboxGroupedByPage key={entry[0]} page={Number(entry[0])} reviewCheckArray={entry[1]} statusDict={filterStatusDictByPage(statusDict, Number(entry[0]))} />
            ))}
        </div>
    )
}

export default CheckboxBody
