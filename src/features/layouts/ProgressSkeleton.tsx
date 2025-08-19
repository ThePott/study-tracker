import Skeleton from '@/src/shared/components/Skeleton'

const ProgressSkeleton = () => {

    return (
        <div className="flex gap-3 overflow-hidden h-full">
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
    )
}

export default ProgressSkeleton