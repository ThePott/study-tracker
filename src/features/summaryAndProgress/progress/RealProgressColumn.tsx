import useBoundStore from "@/src/shared/store"
import { Box } from "@mui/material"
import ProgressBox from "./ProgressBox"

// 이전엔 어떻게 나눠받았지???
const RealProgressColumn = ({ bookId }: { bookId: string }) => {
    const progressArray = useBoundStore((state) => state.progressArray)

    const filteredProgressArray = progressArray.filter(
        (progress) => progress.bookId === bookId
    )

    return (
        <Box className="flex flex-col gap-3">
            {filteredProgressArray.map((progress) => (
                <ProgressBox progress={progress} />
            ))}
        </Box>
    )
}

export default RealProgressColumn
