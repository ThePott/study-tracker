import NeutralButton from '@/src/shared/components/NeutralButton'
import useBoundStore from '@/src/shared/store'
import { useLocation, useNavigate } from 'react-router'

const TabHeader = () => {
    const location = useLocation()
    const pathname = location.pathname
    const navigate = useNavigate()
    const user = useBoundStore((state) => state.user)
    if (!user) { return null }

    return (
        <>
            {user.role === "INSTRUCTOR" && <NeutralButton isOn={pathname === "/manage"} onClick={() => navigate("/manage")} label='학생 관리' variant='VIVID_PILL' />}
            <NeutralButton isOn={pathname === "/summary"} onClick={() => navigate("/summary")} label='요약' variant='VIVID_PILL' />
            <NeutralButton isOn={pathname === "/progress"} onClick={() => navigate("/progress")} label='진도표' variant='VIVID_PILL' />
            <NeutralButton isOn={pathname === "/review-check"} onClick={() => navigate("/review-check")} label='오답 체크' variant='VIVID_PILL' />
        </>
    )
}

export default TabHeader