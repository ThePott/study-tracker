import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useLocation, useNavigate } from 'react-router';

interface TabInfo {
  pathname: string
  label: string
}

const tabInfoArray: TabInfo[] = [
  { pathname: "summary", label: "요약" },
  { pathname: "progress", label: "진도표" },
  { pathname: "review-assignment", label: "오답 과제" },
]

const InstructorHeader = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPathname = location.pathname.split("/instructor/")[1]?.split("/")[0] ?? ""

  return (
    <Tabs variant='fullWidth'
      value={currentPathname} onChange={(_event, value) => navigate(`/instructor/${value}`)}>
      {tabInfoArray.map((tabInfo, index) => <Tab sx={{ fontWeight: 600 }} key={index} value={tabInfo.pathname} label={tabInfo.label} />)}

    </Tabs>
  )
}



export default InstructorHeader