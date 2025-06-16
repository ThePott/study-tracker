import React, { Children } from 'react'
import { Outlet } from 'react-router'
import StudentHeader from './StudentHeader'

const StudentLayout = () => {
  return (
    <div className='w-full h-full bg-black flex justify-center items-center'>
      <div className='w-2xl h-full bg-blue-300 sm:h-[800px] flex'>
        
        <StudentHeader />
        <Outlet context={Children}/>
      
      </div>
    </div>
  )
}

export default StudentLayout