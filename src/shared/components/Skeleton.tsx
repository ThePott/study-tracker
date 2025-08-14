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

const Skeleton = ({ skeletonVariant = "BOX", fontVariant, heightInPixel, widthInPixel, isPill = false }: SkeletonProps) => {
    const sizeStyle = makeSkeletonSizeStyle(skeletonVariant, fontVariant, heightInPixel, widthInPixel)
    return (
        <div style={sizeStyle} className={`${styleClassName.borderMuted} ${styleClassName.bgMuted} ${isPill ? styleClassName.roundedFull : styleClassName.rounded} shrink-0`}>

        </div>
    )
}

export default Skeleton