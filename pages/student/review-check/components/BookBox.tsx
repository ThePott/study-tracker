import useReviewCheckStore from '@/store/reviewCheckStore'
import { Box, Button, Skeleton, Typography } from '@mui/material'
import React, { useState } from 'react'

const buttonStyle = {
  color: "hsl(0 0 95%)",
  borderColor: "hsl(0 0 30)",
  "&:hover": {
    borderColor: "hsl(0 0 60%)"
  },
  borderRadius: "24px",
}

// const BookBox = ({ bookTitle, setSelectedBookTitle }: { bookTitle: string, setSelectedBookTitle: React.Dispatch<React.SetStateAction<string>> }) => {
const BookBox = ({ bookTitle }: { bookTitle: string }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const bg = isSelected ? "white" : "inherit"

  const setSelectedBookTitle = useReviewCheckStore((state) => state.setSelectedBookTitle)

  const handleClick = () => {
    setIsSelected(true)
    setSelectedBookTitle(bookTitle)

  }

  return (
    <Button
      className="flex justify-center items-center p-6 rounded-3xl w-[200px] h-[200px]"
      variant='outlined'
      sx={{ ...buttonStyle, backgroundColor: bg }}
      onClick={handleClick}>

      <Typography variant='h6'>{bookTitle}</Typography>

    </Button>
  )
}

export default BookBox