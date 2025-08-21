import React from 'react'
import { scrollbarStyle } from '../../constants/style'

const RowOutletContainer = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const { children, ...rest } = props

  return (
    <div {...rest} style={scrollbarStyle} className={`flex w-full h-full overflow-x-auto overflow-y-scroll`}>

      <div className="grow" />
      <div className="flex gap-3 h-full">
        {children}
      </div>
      <div className="grow" />
      
    </div>
  )
}

export default RowOutletContainer