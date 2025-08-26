import RowOutletContainer from "@/src/shared/components/outletContainers/RowContainer"
import ColumnSkeleton from "./ColumnSkeleton"

const ProgressSkeleton = () => {
    return (
        <RowOutletContainer isForSkeleton>
            <ColumnSkeleton />
        </RowOutletContainer>
    )
}

export default ProgressSkeleton
