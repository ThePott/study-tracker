import RowOutletContainer from "@/src/shared/components/outletContainers/RowContainer"
import { inProgressStatusArray } from "@/src/shared/interfaces"
import DndProvider from "./DndProvider"
import SummaryColumn from "./SummaryColumn"

const SummaryContent = () => {
    return (
        <DndProvider>
            <RowOutletContainer>
                {inProgressStatusArray.map((inProgressStatus) => (
                    <SummaryColumn
                        key={inProgressStatus}
                        inProgressStatus={inProgressStatus}
                    />
                ))}
            </RowOutletContainer>
        </DndProvider>
    )
}

export default SummaryContent
