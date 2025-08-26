import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { useLocation, useNavigate } from "react-router"

interface TabInfo {
    pathname: string
    label: string
}

const tabInfoArray: TabInfo[] = [
    { pathname: "summary", label: "요약" },
    { pathname: "progress", label: "진도표" },
    { pathname: "review-check", label: "오답 체크" },
]

const StudentHeader = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const currentPathname = location.pathname
        .split("/student/")[1]
        .split("/")[0]

    return (
        <Tabs
            variant="fullWidth"
            value={currentPathname}
            onChange={(_event, value) => navigate(`/student/${value}`)}
        >
            {tabInfoArray.map((tabInfo, index) => (
                <Tab
                    sx={{ fontWeight: 600 }}
                    key={index}
                    value={tabInfo.pathname}
                    label={tabInfo.label}
                />
            ))}
        </Tabs>
    )
}

export default StudentHeader
