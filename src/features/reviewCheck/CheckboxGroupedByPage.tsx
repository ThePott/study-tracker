import { ReviewCheck, ReviewCheckStatusDict } from "@/src/shared/interfaces/_reviewCheckInterfaces"
import Checkbox from "./Checkbox"
import { styleClassName } from "@/src/shared/constants/style"

const CheckboxGroupedByPage = ({ page, reviewCheckArray, statusDict }: { page: number; reviewCheckArray: ReviewCheck[], statusDict: ReviewCheckStatusDict }) => {

    return (
        <div className="flex gap-2 items-center">
            <p className={`min-w-[60px] text-center ${styleClassName.fontJustBold} ${styleClassName.fontMuted} font-semibold`}>p.{page}</p>
            <div className="flex flex-wrap gap-2">
                {reviewCheckArray.map((reviewCheck) => (
                    <Checkbox key={reviewCheck.id} reviewCheck={reviewCheck} status={statusDict[reviewCheck.id].status} />
                ))}
            </div>
        </div>
    )
}

export default CheckboxGroupedByPage
