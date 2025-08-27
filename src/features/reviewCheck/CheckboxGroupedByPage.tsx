import { ReviewCheck } from "@/src/shared/interfaces/_reviewCheckInterfaces"
import Checkbox from "./Checkbox"

const CheckboxGroupedByPage = ({ page, reviewCheckArray }: { page: number, reviewCheckArray: ReviewCheck[] }) => {

    return (

    <div className="flex flex-col gap-3">
        <p>{page}</p>
        {reviewCheckArray.map((reviewCheck) => <Checkbox reviewCheck={reviewCheck} />)}
    </div>
    ) 
}

export default CheckboxGroupedByPage
