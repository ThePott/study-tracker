import { Box } from '@mui/material'
import React from 'react'
import BookBox from './BookBox'

// const demoBookTitleArray = ["고쟁이 수학(상)", "마플 시너지 수학(상)"]

const BookSection = ({ bookTitleArray, setSelectedBookTitle }: { bookTitleArray: string[],  setSelectedBookTitle: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <Box className="flex flex-wrap gap-3">
      {bookTitleArray.map((bookTitle) => (
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