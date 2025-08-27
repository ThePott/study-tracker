import NeutralButton from "@/src/shared/components/NeutralButton"
import { styleClassName } from "@/src/shared/constants/style"

const BookBox = ({ bookTitle }: { bookTitle: string }) => {
    return (
        <NeutralButton className="flex justify-center items-center p-6 rounded-3xl w-[200px] h-[200px]" variant="NEUTRAL">
            <p className={styleClassName.fontVivid}>{bookTitle}</p>
        </NeutralButton>
    )
}

export default BookBox
