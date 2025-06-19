import React, { MouseEventHandler, useState, useMemo, useCallback } from 'react'
import { useReviewCheckMany } from './apiHooks'
import { ReviewCheckData } from '../../_interfaces/interfaces'

const StdReviewCheckPage = () => {
  const studentId = "68494394d9f33f23de4513c5"
  const { reviewCheckArray, isLoading, error } = useReviewCheckMany(studentId)
  const [recentArray, setRecentArray] = useState<number[]>([])

  const sortedRecent = useMemo(() => {
    return [...recentArray].sort((a, b) => a - b)
  }, [recentArray])

  const checkInBetween = useCallback((index: number) => {
    if (sortedRecent.length < 2) return false
    return sortedRecent[0] < index && index < sortedRecent[sortedRecent.length - 1]
  }, [sortedRecent])

  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
    const optionalIndex = event.currentTarget.dataset.index
    if (!optionalIndex) return

    const index = parseInt(optionalIndex)

    setRecentArray(prev => {
      const newArray = [...prev]
      if (newArray.length === 2) {
        newArray.shift()
      }
      newArray.push(index)
      return newArray
    })
  }, [])

  const Checkbox = React.memo(({ index, reviewCheckData }: { index: number, reviewCheckData: ReviewCheckData }) => {
    const isSelected = recentArray.includes(index)
    const isBetween = checkInBetween(index)
    
    const color = isSelected ? "bg-red-500" : 
                  isBetween ? "bg-blue-500" : "bg-zinc-200"
    
    return (
      <div 
        className={`w-[60px] h-[60px] ${color}`} 
        onClick={handleClick} 
        data-index={index}
      >
        {reviewCheckData.questionNumber}
      </div>
    )
  })

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
        />
      ))}
    </div>
  )
}

export default StdReviewCheckPage