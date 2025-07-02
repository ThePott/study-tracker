import { Box } from '@mui/material'
import React from 'react'
import BookBox from './BookBox'

const demoBookTitleArray = ["고쟁이 수학(상)", "마플 시너지 수학(상)"]

const BookSection = ({ setSelectedBookTitle }: { setSelectedBookTitle: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <Box className="flex flex-wrap gap-3">
      {demoBookTitleArray.map((bookTitle) => (
        <BookBox 
        key={bookTitle} 
        bookTitle={bookTitle} 
        setSelectedBookTitle={setSelectedBookTitle}
        />
      ))}
    </Box>
  )
}

export default BookSection