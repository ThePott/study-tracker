// import GeneralLayout from '@/src/shared/components/GeneralLayout'
// import useBoundStore from '@/src/shared/store'
// import { Outlet } from 'react-router'
// import SidebarStudentList from '../manage/SidebarStudentList'
// import TabHeaderSkeleton from './tabHeader/TabHeaderSkeleton'

// const AppLayoutSkeleton = () => {
//   const user = useBoundStore((state) => state.user)
//   const doNeedSidebar = user?.role === "INSTRUCTOR"

//   return (
//     <GeneralLayout>
//       <GeneralLayout.Header>
//         <TabHeaderSkeleton />
//       </GeneralLayout.Header>
//       <GeneralLayout.Body>
//         {doNeedSidebar && <SidebarStudentList />}
//         <GeneralLayout.Outlet>
//           <Outlet />
//         </GeneralLayout.Outlet>
//       </GeneralLayout.Body>
//     </GeneralLayout>
//   )
// }

// export default AppLayoutSkeleton