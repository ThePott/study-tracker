import React, { useEffect, useMemo, useState } from 'react';
import { useReviewCheckMany } from './apiHooks';

import Checkbox from "./Checkbox";
import { checkboxStatusArray } from './interface';
import { ReviewCheckData } from '../../_interfaces/interfaces';
// 보통은 구분을 함
// 다른데서도 사용을 하게 될 거니까 ---> 파라미터를 넘겨받아야 하면 다 넘김 (스프레드 써서 프로퍼티 일일이 적지는 않고)
// 훅으로 구분 // 데이터 핸들링 로직은 후크로 뺀다


//** 오리지널 스테이터스 가지고 온 다음 그걸 기준으로 스플라이스 한 걸 상태 변환 함수에 넣어야 함 */
const useCheckboxLogic = (reviewCheckArray: ReviewCheckData[] | null) => {
    const [recentRawArray, setRecentRawArray] = useState<number[]>([])

    const statusArray = useMemo(() => {
        if (!reviewCheckArray) { return [] }

        const initialStatusArray = Array(reviewCheckArray.length).fill("NOT_SOLVED") as (typeof checkboxStatusArray[number])[]

        if (recentRawArray.length === 0) { return initialStatusArray }

        const copiedInitialStatusArray = [...initialStatusArray]
        const recentSortedArray = [...recentRawArray].sort((a, b) => a - b)

        const startIndex = Math.min(...recentSortedArray)
        const spliceLength = Math.max(...recentRawArray) - startIndex + 1

        copiedInitialStatusArray.splice(startIndex, spliceLength, ...Array(spliceLength).fill("CORRECT"))

        return copiedInitialStatusArray
    }, [reviewCheckArray, recentRawArray])

    return {
        setRecentRawArray,
        statusArray
    }
}

const StdReviewCheckPage = () => {
    const studentId = "68494394d9f33f23de4513c5"
    const { reviewCheckArray, isLoading, error } = useReviewCheckMany(studentId)

    const { setRecentRawArray, statusArray } = useCheckboxLogic(reviewCheckArray)

    console.log("---- re-rendering:", reviewCheckArray?.length)

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

                    setRecentRawArray={setRecentRawArray}
                />
            ))}
        </div>
    )
}

export default StdReviewCheckPage
