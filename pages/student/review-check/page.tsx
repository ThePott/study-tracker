import { Button } from '@mui/material';
import { useCheckboxStatus, useReviewCheckApi } from './hooks';
import Checkbox from "./Checkbox";
import { useState } from 'react';

const StdReviewCheckPage = () => {
    const studentId = "68494394d9f33f23de4513c5"
    const { reviewCheckArray, isLoading, error } = useReviewCheckApi(studentId)
    const { setRecentTwoIndexes, statusArray } = useCheckboxStatus(reviewCheckArray)

    const [editedCheckboxIndexArray, setEditedCheckboxIndexArray] = useState<number[]>([])

    if (!reviewCheckArray) return null
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    const checkManually = () => {
        console.log("---- edited array:", editedCheckboxIndexArray)
    }

    const postEditedIdStatusDict = () => {
        
    }

    return (
        <div className='flex flex-wrap gap-3'>
            <Button onClick={checkManually}>변한 체크박스 아이디 출력</Button>
            {reviewCheckArray.map((reviewCheckData, index) => (
                <Checkbox
                    key={reviewCheckData._id}
                    reviewCheckData={reviewCheckData}
                    index={index}
                    status={statusArray[index]}
                    setRecentTwoIndexes={setRecentTwoIndexes}
                    setEditedCheckboxIndexArray={setEditedCheckboxIndexArray}
                />
            ))}
        </div>
    )
}

export default StdReviewCheckPage
