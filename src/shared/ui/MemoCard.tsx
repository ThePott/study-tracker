import { JSX } from 'react'
import { miniStyle } from './styleConstants'

const MemoCard = ({ children, className = "" }: { children: JSX.Element, className?: string }) => {
  return (
    <div className={`p-6 ${miniStyle.memoWidth} ${miniStyle.memoHeight} ${miniStyle.rounded} ${className}`}>
      {children}
    </div>
  )
}

export default MemoCard