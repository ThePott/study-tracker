import { ReviewCheck } from "@/src/shared/interfaces/_reviewCheckInterfaces"
import Checkbox from "./Checkbox"
import { styleClassName } from "@/src/shared/constants/style"

const CheckboxGroupedByPage = ({ page, reviewCheckArray }: { page: number; reviewCheckArray: ReviewCheck[] }) => {
    return (
        <div className="flex gap-2 items-center">
            <p className={`min-w-[60px] text-center ${styleClassName.fontJustBold} ${styleClassName.fontMuted} font-semibold`}>p.{page}</p>
            <div className="flex flex-wrap gap-2">
                {reviewCheckArray.map((reviewCheck) => (
                    <Checkbox reviewCheck={reviewCheck} />
                ))}
            </div>
        </div>
    )
}

export default CheckboxGroupedByPage
