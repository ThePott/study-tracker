import React from 'react'
import { Outlet } from 'react-router'
import StudentSidebar from './StudentSidebar'

const StudentLayout = () => {
  return (
    // full screen
    <div className='w-full h-full bg-black flex justify-center items-center'>
      {/* app boundary */}
      <div className='w-2xl h-full bg-blue-300 flex sm:h-[800px]'>
        <StudentSidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default StudentLayout

// display: flex;
// justify-content: center;
// align-items: center;
// @media screen and (max-width: 672px) {
//   #root {
//     align-items: start;
//   }
// }