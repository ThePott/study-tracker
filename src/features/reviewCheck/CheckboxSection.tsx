import CheckboxBody from "./CheckboxBody"
import CheckboxHeader from "./CheckboxHeader"

const CheckboxSection = () => {
    return (
        <div className="flex flex-col gap-3">
            <CheckboxHeader />
            <CheckboxBody />
        </div>
    )
}

export default CheckboxSection
