import { styleClassName } from "../constants/style"
import { SkeletonVariant } from "../interfaces"
import { makeSkeletonSizeStyle, type FontVariant } from "../utils"


interface SkeletonProps {
    skeletonVariant?: SkeletonVariant
    fontVariant?: FontVariant

    heightInPixel?: number
    widthInPixel?: number

    isPill?: boolean
}
// dayjs 쓰면 
// 스켈레톤은 보통 보더 없음
// 울렁울렁 배경 애니메이션
// 배포 서비스는 다른 거 해도 ok -- 보통은 같은 걸로 함 // 다음주에 배포
// s3는 깃헙 액션으로 cicd production branch, 자동배포
const Skeleton = ({ skeletonVariant = "BOX", fontVariant, heightInPixel, widthInPixel, isPill = false }: SkeletonProps) => {
    const sizeStyle = makeSkeletonSizeStyle(skeletonVariant, fontVariant, heightInPixel, widthInPixel)
    return (
        <div style={sizeStyle} className={`${styleClassName.borderMuted} ${styleClassName.bgMuted} ${isPill ? styleClassName.roundedFull : styleClassName.rounded} shrink-0`}>

        </div>
    )
}

export default Skeleton