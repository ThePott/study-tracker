import GeneralLayout from '@/src/shared/components/GeneralLayout'
import { useLocation } from 'react-router'

const TabHeader = () => {
    const location = useLocation()
    const pathname = location.pathname
    console.log({ pathname })

    return (
        <>
            <GeneralLayout.HeaderItem isForSidebar>학생 관리</GeneralLayout.HeaderItem>
            <GeneralLayout.HeaderItem>요약</GeneralLayout.HeaderItem>
            <GeneralLayout.HeaderItem>진도표</GeneralLayout.HeaderItem>
            <GeneralLayout.HeaderItem>오답 체크</GeneralLayout.HeaderItem>
        </>
    )
}

export default TabHeader