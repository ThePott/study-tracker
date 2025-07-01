import { useCheckboxStatus, useReviewCheckApi } from './apiHooks';
import Checkbox from "./Checkbox";

const StdReviewCheckPage = () => {
    const studentId = "68494394d9f33f23de4513c5"
    const { reviewCheckArray, isLoading, error } = useReviewCheckApi(studentId)
    const { setRecentTwoIndexes, statusArray } = useCheckboxStatus(reviewCheckArray)

    if (!reviewCheckArray) return null
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className='flex flex-wrap gap-3'>
            {reviewCheckArray.map((reviewCheckData, index) => (
                <Checkbox
                    key={reviewCheckData._id}
                    reviewCheckData={reviewCheckData}
                    index={index}
                    status={statusArray[index]}

                    setRecentTwoIndexes={setRecentTwoIndexes}
                />
            ))}
        </div>
    )
}

export default StdReviewCheckPage
