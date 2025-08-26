import GeneralLayout from "@/src/shared/components/GeneralLayout"
import Skeleton from "@/src/features/skeletons/Skeleton"
import { styleClassName } from "@/src/shared/constants/style"
import useBoundStore from "@/src/shared/store"
import SummarySkeleton from "./SummarySkeleton"

const AppLayoutSkeleton = () => {
    const user = useBoundStore((state) => state.user)
    const doNeedSidebar = user?.role === "INSTRUCTOR"

    return (
        <GeneralLayout>
            <GeneralLayout.Header>
                {doNeedSidebar && (
                    <Skeleton isPill heightInPixel={33.6} widthInPixel={84.9} />
                )}
                <Skeleton isPill heightInPixel={33.6} widthInPixel={53.29} />
                <Skeleton isPill heightInPixel={33.6} widthInPixel={67.13} />
                <Skeleton isPill heightInPixel={33.6} widthInPixel={84.9} />
            </GeneralLayout.Header>
            <GeneralLayout.Body>
                {doNeedSidebar && (
                    <GeneralLayout.Sidebar doFix={true}>
                        {Object.keys([...Array(100)]).map((el, index) => (
                            <Skeleton
                                key={index}
                                skeletonVariant="BOX"
                                heightInPixel={33.6}
                            />
                        ))}
                    </GeneralLayout.Sidebar>
                )}

                <GeneralLayout.Outlet>
                    <SummarySkeleton />
                    {/* <div className={`${styleClassName.flex} h-full`}>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </div> */}
                </GeneralLayout.Outlet>
            </GeneralLayout.Body>
        </GeneralLayout>
    )
}

export default AppLayoutSkeleton
