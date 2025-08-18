import NeutralButton from '@/src/shared/components/NeutralButton'
import Skeleton from '@/src/shared/components/Skeleton'
import useBoundStore from '@/src/shared/store'

const ProgressSkeleton = () => {
    const doShowSkeleton = useBoundStore((state) => state.doShowSkeleton)
    // debugger
    return (
        <div className="flex gap-3 overflow-hidden h-full">
            <button className="bg-blue-400" onClick={()=> console.log({doShowSkeleton})}>누르면 do show 출력</button>
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
    )
}

export default ProgressSkeleton