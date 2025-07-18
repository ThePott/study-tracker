import { Box, Button } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const InstructorSidebar = () => {
  return (
    <Box>
      {/* <Button className='w-full fixed'>학생 관리</Button> */}
      <Tabs variant="fullWidth" >
        <Tab  value="manage" label="학생 관리" />
      </Tabs>
      
      <Box sx={{ scrollbarColor: "oklch( 0.4 0 0 ) transparent" }} className="h-full overflow-y-scroll w-[132px] relative">
        <Tabs orientation='vertical' value={0}>
          {Array(30).fill(0).map((_, index) => <Tab sx={{ fontWeight: 600 }} key={index} value={index} label={`학생 이름${index}`} />)}
        </Tabs>
      </Box>

    </Box>
  )
}



export default InstructorSidebar