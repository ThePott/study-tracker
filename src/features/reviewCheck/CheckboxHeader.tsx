import NeutralButton from '@/src/shared/components/NeutralButton'
import useBoundStore from '@/src/shared/store'
import React from 'react'

const CheckboxHeader = () => {
    const isMultiSelecting = useBoundStore((state) => state.isMultiSeleting)
    const toggleIsMultiSelecting = useBoundStore((state) => state.toggleIsMultiSelecting)
  return (
    <div className="flex">
        <NeutralButton variant='NEUTRAL' isOn={isMultiSelecting} onClick={toggleIsMultiSelecting}>다중 선택</NeutralButton>
    </div>
  )
}

export default CheckboxHeader