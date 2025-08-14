import { styleClassName } from "../constants/style"
import { SkeletonVariant } from "../interfaces"
import { convertFontSizeToPixel, makeSkeletonSizeStyle, type FontVariant } from "../utils"


interface SkeletonProps {
    skeletonVariant?: SkeletonVariant
    fontVariant?: FontVariant

    heightInPixel?: number
    widthInPixel?: number
}

const Skeleton = ({ skeletonVariant = "BOX", fontVariant, heightInPixel, widthInPixel }: SkeletonProps) => {
    const sizeStyle = makeSkeletonSizeStyle(skeletonVariant, fontVariant, heightInPixel, widthInPixel)
    return (
        <div style={sizeStyle} className={`${styleClassName.borderMuted} ${styleClassName.bgMuted} ${styleClassName.rounded}`}>

        </div>
    )
}

export default Skeleton