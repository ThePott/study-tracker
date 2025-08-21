import RowOutletContainer from '@/src/shared/components/outletContainers/RowContainer'
import Skeleton from '@/src/shared/components/Skeleton'
import { styleClassName } from '@/src/shared/constants/style'

const ProgressColumnSkeleton = () => {
    return (
        <div className={`flex flex-col items-center gap-3 ${styleClassName.memoWidth}`}>
            <Skeleton widthInPixel={150} heightInPixel={24} />
            <Skeleton widthInPixel={300} />
        </div>
    )
}

const ProgressSkeleton = () => {
    return (
        <RowOutletContainer>
            <ProgressColumnSkeleton />
        </RowOutletContainer>
    )
}

export default ProgressSkeleton