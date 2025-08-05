import { JSX } from 'react'

const MemoCard = ({ children, className = "" }: { children: JSX.Element, className?: string }) => {
  return (
    <div className={`p-6 w-[300px] h-[200px] ${className}`}>
      {children}
    </div>
  )
}

export default MemoCard