import GeneralLayout from "@/src/shared/components/GeneralLayout"
import useBoundStore from "@/src/shared/store"
import TabHeader from "./tabHeader/TabHeader"
import Skeleton from "@/src/shared/components/Skeleton"
import { styleClassName } from "@/src/shared/constants/style"

const AppLayoutSkeleton = () => {
    const user = useBoundStore((state) => state.user)
    const doNeedSidebar = user?.role === "INSTRUCTOR"

    return (
        <GeneralLayout>
            <GeneralLayout.Header>
                <TabHeader />
            </GeneralLayout.Header>
            <GeneralLayout.Body>
                {doNeedSidebar && 
                    <Skeleton skeletonVariant="BOX" widthInPixel={132} />
                }
                <GeneralLayout.Outlet>
                    <Skeleton />
                </GeneralLayout.Outlet>
            </GeneralLayout.Body>
        </GeneralLayout>
    )
}

export default AppLayoutSkeleton