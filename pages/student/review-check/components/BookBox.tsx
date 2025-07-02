import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'

const BookBox = ({ bookTitle, setSelectedBookTitle }: { bookTitle: string, setSelectedBookTitle: React.Dispatch<React.SetStateAction<string>> }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const bg = isSelected ? "white" : "inherit"

  const handleClick = () => {
    setIsSelected(true)
    setSelectedBookTitle(bookTitle)
  }

  return (
    <Button
      className="flex justify-center items-center p-6 rounded-3xl w-[200px] h-[200px]"
      variant='outlined'
      sx={{
        borderRadius: "24px",
        backgroundColor: bg,
        color: "hsl(0 0 95%)",
        border: "1px solid hsl(0 0 30)",
        "&:hover": {
          border: "1px solid hsl(0 0 60%)"
        }
      }}
      onClick={handleClick}
    >
      <Typography variant='h6'>{bookTitle}</Typography>
    </Button>
  )
}

export default BookBox