import React, { MouseEventHandler, useState } from 'react'
import { useReviewCheckMany } from './apiHooks'

import { ReviewCheckData } from '../../_interfaces/interfaces'

const StdReviewCheckPage = () => {
  const studentId = "68494394d9f33f23de4513c5" // FOR TEST
  const { reviewCheckArray, isLoading, error } = useReviewCheckMany(studentId)
  const [recentArray, setRecentArray] = useState<number[]>([])

  if (!reviewCheckArray) { return null }
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const checkInBetween = (index: number) => {
    const copiedArray = [...recentArray]
    const sortedArray = copiedArray.sort((a, b) => a - b)
    return sortedArray[0] < index && index < sortedArray[1]
  }

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    // Get the index from the clicked element's data attribute
    const optionalIndex = event.currentTarget.dataset.index
    if (!optionalIndex) { return }

    const index = parseInt(optionalIndex)

    const copiedArray = [...recentArray]
    if (copiedArray.length === 2) {
      console.log("---- prev:", copiedArray)
      copiedArray.shift()
      console.log("---- next:", copiedArray)
    }

    copiedArray.push(index)
    console.log("---- after: copied array:", copiedArray)
    setRecentArray(copiedArray)
  }

  const Checkbox = ({ index, reviewCheckData }: { index: number, reviewCheckData: ReviewCheckData }) => {
    let color = recentArray.includes(index) ? "bg-red-500" :
      checkInBetween(index) ? "bg-blue-500" : "bg-zinc-200"
    return (
      <div className={`w-[60px] h-[60px] ${color}`} onClick={handleClick} data-index={index}>
        {reviewCheckData.questionNumber}
      </div>
    )
  }

  return (
    <div className='flex flex-wrap gap-3'>
      {reviewCheckArray.map((reviewCheckData, index) => <Checkbox key={reviewCheckData._id} reviewCheckData={reviewCheckData} index={index} data-index={index} />)}</div>
  )
}

export default StdReviewCheckPage