import RowOutletContainer from "@/src/shared/components/outletContainers/RowContainer"
import useBoundStore from "@/src/shared/store"
import { memo } from "react"
import ProgressColumn from "./ProgressColumn"

const ProgressContent = memo(() => {
    const progressArrayInDict = useBoundStore(
        (state) => state.progressArrayInDict
    )
    const bookTitleArray = Object.keys(progressArrayInDict)
    bookTitleArray.sort()

    return (
        <RowOutletContainer>
            {bookTitleArray.map((bookTitle) => (
                <ProgressColumn
                    key={bookTitle}
                    bookTitle={bookTitle}
                    progressArray={progressArrayInDict[bookTitle]}
                />
            ))}
        </RowOutletContainer>
    )
})

export default ProgressContent
