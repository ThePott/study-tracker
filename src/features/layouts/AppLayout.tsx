import GeneralLayout from '@/src/shared/components/GeneralLayout'
import useBoundStore from '@/src/shared/store'
import { Outlet } from 'react-router'
import SidebarStudentList from '../manage/SidebarStudentList'
import TabHeader from './tabHeader/TabHeader'

const AppLayout = () => {
  const user = useBoundStore((state) => state.user)
  const doNeedSidebar = user?.role === "INSTRUCTOR"

  return (
    <GeneralLayout>
      <GeneralLayout.Header>
        <TabHeader />
      </GeneralLayout.Header>
      
      <GeneralLayout.Body>
      
        {doNeedSidebar &&
          <GeneralLayout.Sidebar>
            <SidebarStudentList />
          </GeneralLayout.Sidebar>
        }
      
        <GeneralLayout.Outlet>
          <Outlet />
        </GeneralLayout.Outlet>
      
      </GeneralLayout.Body>

    </GeneralLayout>
  )
}

export default AppLayout