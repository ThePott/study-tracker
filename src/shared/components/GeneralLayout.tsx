import { scrollbarStyle, styleClassName } from "@/src/shared/constants/style"

const GeneralLayoutSidebar = ({ doFix = false, children }: { doFix?: boolean, children: React.ReactNode }) => {
  return (
    <div style={scrollbarStyle} className={`${styleClassName.flexCol} ${styleClassName.siebarWidth} ${doFix ? "overflow-hidden pr-3" : "overflow-x-hidden overflow-y-scroll"}  border-r-1 border-black/30 dark:border-white/30 pt-3 pl-3`}>
      {children}
    </div>
  )
}

/** SKELETON: 패딩 빼고 콘텐트 높이만 */
const GeneralLayoutHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${styleClassName.flexWide} ${styleClassName.center} border-b-1 border-black/30 dark:border-white/30 p-2`}>
      {children}
    </div>
  )
}

const GeneralLayoutOutlet = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${styleClassName.flex1Fixed} pt-3 pl-3`}>
      {children}
    </div>
  )
}

const GeneralLayoutBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${styleClassName.flex1Fixed} flex`}>
      {children}
    </div>
  )
}

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`flex flex-col w-screen h-screen `}>
      {children}
    </div>
  )
}

GeneralLayout.Sidebar = GeneralLayoutSidebar
GeneralLayout.Header = GeneralLayoutHeader
GeneralLayout.Outlet = GeneralLayoutOutlet
GeneralLayout.Body = GeneralLayoutBody

export default GeneralLayout