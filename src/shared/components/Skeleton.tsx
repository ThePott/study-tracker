import { styleClassName } from "../constants/style"
import { convertFontSizeToPixel, type FontVariant } from "../utils"

type SkeletonVariant = "box" | "shortText"

const BaseSkeleton = ({ sx }: { sx: any }) => {
    return (
        <div style={sx} className={`${styleClassName.borderMuted} ${styleClassName.bgMuted} ${styleClassName.rounded}`}>

        </div>
    )
}

const Skeleton = ({ skeletonVariant, fontVariant, heightInPixel }: { skeletonVariant: SkeletonVariant, fontVariant?: FontVariant, heightInPixel?: number }) => {
    switch (skeletonVariant) {
        /** IGNORES fontVariant */
        case "box":
            return <BaseSkeleton sx={{ height: `${heightInPixel}px` }} />

        /** IGNORES heightInPixel */
        case "shortText":
            if (!fontVariant) { throw new Error("---- MUST SPECIFY: fontVariant") }
            const lineHeight = convertFontSizeToPixel(fontVariant) * 1.5
            return <BaseSkeleton sx={{ height: `${lineHeight}px`, width: "100px" }} />
        
        default:
            throw new Error("---- UN-HANDLED CASE of skeleton type")
    }
}

export default Skeleton