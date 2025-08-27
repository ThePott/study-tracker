import NeutralButton from "@/src/shared/components/NeutralButton"
import { styleClassName } from "@/src/shared/constants/style"
import useBoundStore from "@/src/shared/store"

const BookBox = ({ bookTitle }: { bookTitle: string }) => {
    const setSelectedBookTitle = useBoundStore((state) => state.setSelectedBookTitle)
    const handleClick = () => {
        setSelectedBookTitle(bookTitle)
    }
    
    return (
        <NeutralButton onClick={handleClick} className="flex justify-center items-center w-[200px] h-[200px]" variant="NEUTRAL">
            <p className={styleClassName.fontVivid}>{bookTitle}</p>
        </NeutralButton>
    )
}

export default BookBox
