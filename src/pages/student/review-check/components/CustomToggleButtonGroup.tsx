// 여기 코드 엉망이다
// 여기 코드 엉망이다
// 여기 코드 엉망이다
// 여기 코드 엉망이다
// 여기 코드 엉망이다
// 여기 코드 엉망이다

import { CheckboxStatus } from '@/src/_interfaces/reviewCheckInterfaces';
import useReviewCheckStore from '@/src/_store/reviewCheckStore';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import React, { useState } from 'react';

interface CustomButtonProps {
  label: string;
  status: CheckboxStatus;
  isSelected: boolean;
}

const BUTTON_CONFIG = [
  { label: "완료", status: "DONE" as CheckboxStatus },
  { label: "패스", status: "PASS" as CheckboxStatus },
  { label: "정답", status: "CORRECT" as CheckboxStatus },
  { label: "오답", status: "WRONG" as CheckboxStatus },
  { label: "아직", status: "NOT_SOLVED" as CheckboxStatus },
] as const;

const getButtonProps = (status: CheckboxStatus, isSelected: boolean) => {
  const variantObject = {
    "CORRECT": { color: "primary", sx: {} },
    "WRONG": { color: "error", sx: {} },
    "PASS": { color: "warning", sx: {} },
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
          borderColor: "hsl(0 0 30%)",
          backgroundColor: isSelected ? "hsl(0 0 15%)" : undefined,
        }
      }
    },
  }
  return variantObject[status] || variantObject["NOT_SOLVED"]
}


const CustomButton = React.memo(({ label, status, isSelected }: CustomButtonProps) => {
  const setChangeTo = useReviewCheckStore((state) => state.setChangeTo)
  const variant = isSelected ? "contained" : "outlined"
  const additionalButtonProps = getButtonProps(status, isSelected)

  return (
    <Button
      variant={variant}
      color={additionalButtonProps.color}
      sx={additionalButtonProps.sx}
      onClick={() => setChangeTo(status)}>
      {label}
    </Button>
  )
})



const CustomToggleButtonGroup = () => {
  const changeTo = useReviewCheckStore((state) => state.changeTo)

  return (
    <ButtonGroup>
      {BUTTON_CONFIG.map(({ label, status }) => (
        <CustomButton
          key={status}
          label={label}
          status={status}
          isSelected={changeTo === status} />
      ))}
    </ButtonGroup>
  )
}

export default CustomToggleButtonGroup