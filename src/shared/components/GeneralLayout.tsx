import { styleClassName } from "@/src/shared/constants/style"

const GeneralLayoutSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${styleClassName.flexCol} ${styleClassName.siebarWidth} overflow-hidden border-r-1 border-black/30 dark:border-white/30 pt-3 pl-3`}>
      {children}
    </div>
  )
}

const GeneralLayoutHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${styleClassName.flexWide} ${styleClassName.center} border-b-1 border-black/30 dark:border-white/30 p-2`}>
      {children}
    </div>
  )
}

const GeneralLayoutOutlet = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${styleClassName.flex1Fixed}  ${styleClassName.pExceptB}`}>
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