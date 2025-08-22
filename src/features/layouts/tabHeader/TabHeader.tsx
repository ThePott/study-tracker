import NeutralButton from "@/src/shared/components/NeutralButton"
import useBoundStore from "@/src/shared/store"
import { useLocation, useNavigate } from "react-router"

const TabHeader = () => {
    const location = useLocation()
    const pathname = location.pathname
    const navigate = useNavigate()
    const user = useBoundStore((state) => state.user)
    if (!user) {
        return null
    }

    return (
        // 라벨도 프롭 라벨은 받지 않고 칠드런으로 받는 게 더 자연스러울 것
        // isOn -> active 가 더 자연스러울 것
        // 공통 버튼에 너무 많은 역할을 주면 안 됨
        // 추가로 할 땐
        <>
            {user.role === "INSTRUCTOR" && <NeutralButton isOn={pathname === "/manage"} onClick={() => navigate("/manage")} variant='VIVID_PILL'>학생 관리</NeutralButton>}
            
            <NeutralButton isOn={pathname === "/summary"}
                onClick={() => navigate("/summary")} variant='VIVID_PILL'>요약</NeutralButton>
            <NeutralButton isOn={pathname === "/progress"} onClick={() => navigate("/progress")} variant='VIVID_PILL'>진도표</NeutralButton>
            <NeutralButton isOn={pathname === "/review-check"} onClick={() => navigate("/review-check")} variant='VIVID_PILL'>오답 체크</NeutralButton>
        </>
    )
}

export default TabHeader
