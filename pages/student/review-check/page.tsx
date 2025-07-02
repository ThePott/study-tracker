import { Button } from '@mui/material';
import { useCheckboxStatus, useReviewCheckApi, useReviewCheckApiPatch } from './hooks';
import Checkbox from "./Checkbox";
import { useCallback, useState } from 'react';
import { EditedIdStatusDict } from '@/interfaces/reviewCheckInterfaces';


const studentId = "68494394d9f33f23de4513c5"

const StdReviewCheckPage = () => {
    const [editedIdStatusDictArray, setEditedIdStatusDictArray] = useState<EditedIdStatusDict[]>([])

    const { reviewCheckArray, isLoading, error } = useReviewCheckApi(studentId)
    const { setRecentTwoIndexes, statusArray } = useCheckboxStatus(reviewCheckArray)
    const { patchReviewCheck, errorPatch } = useReviewCheckApiPatch()

    if (!reviewCheckArray) return null
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className='flex flex-wrap gap-3'>
            { errorPatch && JSON.stringify(errorPatch)}
            <Button onClick={() => patchReviewCheck(studentId, editedIdStatusDictArray)} variant='outlined'>서버에 보내기</Button>
            {reviewCheckArray.map((reviewCheckData, index) => (
                <Checkbox
                    key={reviewCheckData._id}
                    reviewCheckData={reviewCheckData}
                    index={index}
                    status={statusArray[index]}
                    setRecentTwoIndexes={setRecentTwoIndexes}
                    setEditedIdStatusDictArray={setEditedIdStatusDictArray}
                />
            ))}
        </div>
    )
}

export default StdReviewCheckPage
