import GeneralLayout from '@/src/shared/components/GeneralLayout'
import Skeleton from '@/src/shared/components/Skeleton'

const TabHeaderSkeleton = () => {
    return (
        <>
            <GeneralLayout.HeaderItem isForSidebar>
                <Skeleton skeletonVariant='box' />
            </GeneralLayout.HeaderItem>

            <GeneralLayout.HeaderItem>
                <Skeleton skeletonVariant='box' />
            </GeneralLayout.HeaderItem>
            
            <GeneralLayout.HeaderItem>
                <Skeleton skeletonVariant='box' />
            </GeneralLayout.HeaderItem>
            
            <GeneralLayout.HeaderItem>
                <Skeleton skeletonVariant='box' />
            </GeneralLayout.HeaderItem>
        </>
    )
}

export default TabHeaderSkeleton