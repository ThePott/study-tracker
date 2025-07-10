import { CheckboxStatus } from '@/interfaces/reviewCheckInterfaces';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import React, { useState } from 'react';

interface CustomButtonProps {
  label: string
  status: CheckboxStatus
  isSelected: boolean
  setSelectedStatus: React.Dispatch<React.SetStateAction<CheckboxStatus>>

}

const getButtonProps = (status: CheckboxStatus, isSelected: boolean) => {
  const variantObject = {
    "CORRECT": { color: "primary", sx: {} },
    "WRONG": { color: "error", sx: {} },
    "NOT_SOLVED": {
      color: undefined,
      sx: {
        color: isSelected ? "hsl(0 0 0)" : "hsl(0 0 95%)",
        backgroundColor: isSelected ? "hsl(0 0 95%)" : undefined,
        borderColor: "hsl(0 0 30%)",
        "&:hover": { 
          borderColor: "hsl(0 0 60%)",
          backgroundColor: isSelected ? "hsl(0 0 80%)" : undefined,
        }
      }
    },
    "DONE": {
      color: undefined,
      sx: {
        color: "hsl(0 0 65%)",
        backgroundColor: isSelected ? "hsl(0 0 0)" : undefined,
        borderColor: "hsl(0 0 0)",
        "&:hover": { 
          borderColor: "hsl(0 0 15%)",
          backgroundColor: isSelected ? "hsl(0 0 15%)" : undefined,
        }
      }
    },
    "PASS": { color: "warning", sx: {} },

  }
  return variantObject[status] || variantObject["NOT_SOLVED"]
}


const CustomButton = React.memo(({ label, status, isSelected, setSelectedStatus }: CustomButtonProps) => {
  const variant = isSelected ? "contained" : "outlined"
  const additionalButtonProps = getButtonProps(status, isSelected)
  return (
    <Button
      variant={variant}
      color={additionalButtonProps.color}
      sx={additionalButtonProps.sx}
      onClick={() => setSelectedStatus(status)}>
      {label}
    </Button>
  )
})

const Workbench = () => {
  const [selectedStatus, setSelectedStatus] = useState<CheckboxStatus>("CORRECT")
  return (
    <ButtonGroup>
      <CustomButton label="완료" status="DONE" isSelected={selectedStatus === "DONE"} setSelectedStatus={setSelectedStatus} />
      <CustomButton label="패스" status="PASS" isSelected={selectedStatus === "PASS"} setSelectedStatus={setSelectedStatus} />
      <CustomButton label="정답" status="CORRECT" isSelected={selectedStatus === "CORRECT"} setSelectedStatus={setSelectedStatus} />
      <CustomButton label="오답" status="WRONG" isSelected={selectedStatus === "WRONG"} setSelectedStatus={setSelectedStatus} />
      <CustomButton label="아직" status="NOT_SOLVED" isSelected={selectedStatus === "NOT_SOLVED"} setSelectedStatus={setSelectedStatus} />
    </ButtonGroup>
  )
}

export default Workbench