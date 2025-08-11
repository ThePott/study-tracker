import { JSX } from 'react'
import { styleClassName } from '../constants/style'

const MemoCard = ({ children, className = "" }: { children: JSX.Element, className?: string }) => {
  return (
    <div className={`p-6 ${styleClassName.memoWidth} ${styleClassName.memoHeight} ${styleClassName.rounded} ${className}`}>
      {children}
    </div>
  )
}

export default MemoCard