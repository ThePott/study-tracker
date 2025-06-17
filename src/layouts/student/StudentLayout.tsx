import React, { Children } from 'react'
import { Outlet } from 'react-router'
import StudentHeader from './StudentHeader'

const StudentLayout = () => {
  return (
    <div className='w-full h-full bg-black flex justify-center items-center'>
      <div className='w-2xl bg-bg0 sm:rounded-[24px]'>
        <StudentHeader />
        <main className='p-[12px] h-[calc(100vh-60px)] overflow-x-hidden overflow-y-scroll sm:h-[800px]'>
          <Outlet context={Children} />
        </main>
      </div>
    </div>
  )
}

export default StudentLayout