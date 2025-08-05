import { Box, Skeleton } from '@mui/material'
import BookBox from './BookBox'
import useBoundStore from '@/src/shared/store'

const BookkSectionSkeleton = () => {
  return (
    <>
      <Skeleton sx={{ borderRadius: "24px" }} variant="rounded" width={200} height={200} />
      <Skeleton sx={{ borderRadius: "24px" }} variant="rounded" width={200} height={200} />
    </>
  )
}

const BookSection = ({ bookTitleArray }: { bookTitleArray: string[] }) => {
  const response = useBoundStore((state) => state.response)
  const isLoading = !response || response.status === "IS_LOADING"

  if (response && response.status === "ERROR") { return <div>Error: {response.message}</div> }

  return (
    <Box className="flex flex-wrap gap-3 p-3">

      {isLoading && <BookkSectionSkeleton />}

      {!isLoading && bookTitleArray.map((bookTitle) => (
        <BookBox key={bookTitle} bookTitle={bookTitle} />
      ))}

    </Box>
  )
}

export default BookSection