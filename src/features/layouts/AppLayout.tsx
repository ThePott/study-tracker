import { styleClassName } from '@/src/shared/constants/style'
import { Outlet } from 'react-router'
import TabHeader from './TabHeader'

const AppLayout = () => {
  const doNeedSidebar = true
  return (
    <div className={`${styleClassName.fullScreen} ${styleClassName.flexCol} ${styleClassName.bg}`}>
      <TabHeader />
      <div className={`${styleClassName.flex1Fixed} ${doNeedSidebar && styleClassName.flex}`}>
        {doNeedSidebar && <h2>sidebar</h2>}
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout