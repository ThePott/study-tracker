import useBoundStore from "@/src/shared/store"
import CheckboxGroupedByPage from "./CheckboxGroupedByPage"
import { scrollbarStyle } from "@/src/shared/constants/style"

const CheckboxBody = () => {
    const reviewCheckGroupedByBook = useBoundStore((state) => state.reviewCheckGroupedByBook)
    const selectedBookTitle = useBoundStore((state) => state.selectedBookTitle)
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
                <CheckboxGroupedByPage page={Number(entry[0])} reviewCheckArray={entry[1]} />
            ))}
        </div>
    )
}

export default CheckboxBody
