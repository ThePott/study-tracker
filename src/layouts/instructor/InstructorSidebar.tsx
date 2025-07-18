import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const InstructorSidebar = () => {
  return (
    <Box sx={{scrollbarColor: "oklch( 0.4 0 0 ) transparent"}} className="overflow-y-scroll">
      <Tabs orientation='vertical' >
        {Array(30).fill(0).map((_, index) => <Tab sx={{ fontWeight: 600 }} key={index} value={index} label={`학생 이름${index}`} />)}
      </Tabs>
    </Box>
  )
}



export default InstructorSidebar