import React from 'react'

const StudentSidebar = () => {
  return (
    <div className='w-[100px] h-full bg-amber-700 flex flex-col'>
      <a href="/student/homework">숙제</a>
      <a href="/student/progress">진도</a>
      <a href="/student/review-check">오답</a>
    </div>
  )
}

export default StudentSidebar