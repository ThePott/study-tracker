import React, { MouseEventHandler, useState, useMemo, useCallback, useEffect } from 'react'
import { useReviewCheckMany } from './apiHooks'
import { ReviewCheckData } from '../../_interfaces/interfaces'

import Checkbox from "./Checkbox"
// 보통은 구분을 함
// 다른데서도 사용을 하게 될 거니까 ---> 파라미터를 넘겨받아야 하면 다 넘김 (스프레드 써서 프로퍼티 일일이 적지는 않고)
// 훅으로 구분 // 데이터 핸들링 로직은 후크로 뺀다


const useRecentSorted = (
    recentRawArray: number[],
    setRecentSortedArray: React.Dispatch<React.SetStateAction<number[]>>,
) => {
    return useEffect(
        () => { 
            const copiedArray = [...recentRawArray].sort((a, b) => a - b)
            setRecentSortedArray(copiedArray)
        },
        [recentRawArray]
    )
}

const StdReviewCheckPage = () => {
    const studentId = "68494394d9f33f23de4513c5"
    const { reviewCheckArray, isLoading, error } = useReviewCheckMany(studentId)

    // set recent raw: 이건 체크박스에서만
    // set recent sorted: 이건 페이지에서만
    const [recentRawArray, setRecentRawArray] = useState<number[]>([])
    const [recentSortedArray, setRecentSortedArray] = useState<number[]>([])

    useRecentSorted(recentRawArray, setRecentSortedArray)

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

                    recentRawArray={recentRawArray}
                    setRecentRawArray={setRecentRawArray}

                    recentSortedArray={recentSortedArray}
                />
            ))}
        </div>
    )
}

export default StdReviewCheckPage
