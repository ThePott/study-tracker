import React from 'react'
import { scrollbarStyle } from '../../constants/style'

interface AdditionalProps {
  isForSkeleton?: boolean
}

type RowOutletContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & AdditionalProps

const RowOutletContainer = (props: RowOutletContainerProps) => {
  const { isForSkeleton, children, ...rest } = props

  return (
    <div {...rest} style={scrollbarStyle} className={`flex w-full h-full ${isForSkeleton ? "pr-3" : "overflow-x-auto overflow-y-scroll"}`}>

      <div className="grow" />
      <div className="flex gap-3 h-full">
        {children}
      </div>
      <div className="grow" />
      
    </div>
  )
}

export default RowOutletContainer