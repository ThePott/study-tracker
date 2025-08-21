import RowOutletContainer from '@/src/shared/components/outletContainers/RowContainer'
import ColumnSkeleton from './ColumnSkeleton'

const SummarySkeleton = () => {
    return (
        <RowOutletContainer isForSkeleton>
            <ColumnSkeleton />
            <ColumnSkeleton />
            <ColumnSkeleton />
        </RowOutletContainer>
    )
}

export default SummarySkeleton