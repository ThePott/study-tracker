import React, { MouseEventHandler, useState, useMemo, useCallback } from 'react'
import { useReviewCheckMany } from './apiHooks'
import { ReviewCheckData } from '../../_interfaces/interfaces'

import Checkbox from "./Checkbox"
// 보통은 구분을 함
// 다른데서도 사용을 하게 될 거니까 ---> 파라미터를 넘겨받아야 하면 다 넘김 (스프레드 써서 프로퍼티 일일이 적지는 않고)
// 훅으로 구분 // 데이터 핸들링 로직은 후크로 뺀다


const StdReviewCheckPage = () => {
    const studentId = "68494394d9f33f23de4513c5"
    const { reviewCheckArray, isLoading, error } = useReviewCheckMany(studentId)
    const [recentArray, setRecentArray] = useState<number[]>([])




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
                    recentArray={recentArray}
                    setRecentArray={setRecentArray}
                />
            ))}
        </div>
    )
}

export default StdReviewCheckPage
