import Skeleton from "@/src/features/skeletons/Skeleton"
import { styleClassName } from "@/src/shared/constants/style"

const ColumnSkeleton = () => {
    return (
        <div className={`flex flex-col items-center gap-3 ${styleClassName.memoWidth}`}>
            <Skeleton widthInPixel={150} heightInPixel={24} />
            <Skeleton widthInPixel={300} />
        </div>
    )
}

export default ColumnSkeleton