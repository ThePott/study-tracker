import React, { ReactNode } from 'react'

const DndProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default DndProvider