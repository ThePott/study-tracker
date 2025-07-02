import { Button } from '@mui/material';
import { useCheckboxStatus, useReviewCheckApi, useReviewCheckApiPatch } from './hooks';
import Checkbox from "./Checkbox";
import { useCallback, useState } from 'react';
import { EditedIdStatusDict } from '@/interfaces/reviewCheckInterfaces';
import Header from './Header';


const studentId = "68494394d9f33f23de4513c5"

const StdReviewCheckPage = () => {
    const [editedIdStatusDictArray, setEditedIdStatusDictArray] = useState<EditedIdStatusDict[]>([])
    const [isMultiSelecting, setIsMultiSelecting] = useState<boolean>(false)

    const { reviewCheckArray, isLoading, error } = useReviewCheckApi(studentId)
    const { setRecentTwoIndexes, statusArray } = useCheckboxStatus(reviewCheckArray)
    const { patchReviewCheck, errorPatch } = useReviewCheckApiPatch()

    if (!reviewCheckArray) return null
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className='flex flex-wrap gap-3'>
            <Header
                studentId={studentId}
                editedIdStatusDictArray={editedIdStatusDictArray}
                patchReviewCheck={patchReviewCheck}
                errorPatch={errorPatch} 
                isMultiSelecting={isMultiSelecting}
                setIsMultiSelecting={setIsMultiSelecting}/>

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
