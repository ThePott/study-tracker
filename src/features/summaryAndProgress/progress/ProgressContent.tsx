import { scrollbarStyle } from "@/src/shared/constants/style"
import useBoundStore from "@/src/shared/store"
import { memo } from "react"
import ProgressColumn from "./ProgressColumn"


const ProgressContent = memo(() => {
  const progressArrayInDict = useBoundStore((state) => state.progressArrayInDict)
  const bookTitleArray = Object.keys(progressArrayInDict)
  bookTitleArray.sort()
  

  return (
    <div style={scrollbarStyle} className={`flex gap-3 justify-center h-full overflow-x-hidden overflow-y-scroll`}>
      {bookTitleArray.map((bookTitle) => <ProgressColumn key={bookTitle} bookTitle={bookTitle} progressArray={progressArrayInDict[bookTitle]} />)}
    </div>
  )
})

export default ProgressContent