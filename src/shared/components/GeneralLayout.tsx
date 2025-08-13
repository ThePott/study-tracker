import { styleClassName } from "@/src/shared/constants/style"
import { Children, createContext, useContext } from "react"

// interface GeneralLayoutContent {
//   skeleton: boolean
// }

/** CONTAINS: skeleton */
// const GeneralLayoutContext = createContext<GeneralLayoutContent>({ skeleton: false })

// const useGeneralLayoutContext = () => {
//   const context = useContext(GeneralLayoutContext)
//   if (!context) {
//     throw new Error("---- CONTEXT FAILED")
//   }
//   return context
// }

const GeneralLayoutSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${styleClassName.flexCol} ${styleClassName.siebarWidth} ${styleClassName.flex1YScroll}`}>
      {children}
    </div>
  )
}

// const GeneralLayoutHeaderItem = ({ children, isForSidebar = false }: { children: React.ReactNode, isForSidebar?: boolean }) => {
//   const { skeleton } = useGeneralLayoutContext()

//   if (skeleton) { return children }

//   return (
//     <div className={`${styleClassName.groupByBorder} ${styleClassName.center} ${isForSidebar ? styleClassName.siebarWidth : styleClassName.grow}`}>
//       {children}
//     </div>
//   )
// }

const GeneralLayoutHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${styleClassName.flexWide} ${styleClassName.center}`}>
      {children}
    </div>
  )
}

const GeneralLayoutOutlet = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styleClassName.flex1Fixed}>
      {children}
    </div>
  )
}

const GeneralLayoutBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styleClassName.flex}>
      {children}
    </div>
  )
}

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${styleClassName.flexCol} ${styleClassName.fullScreen} `}>
      {children}
    </div>
  )
}

GeneralLayout.Sidebar = GeneralLayoutSidebar
GeneralLayout.Header = GeneralLayoutHeader
// GeneralLayout.HeaderItem = GeneralLayoutHeaderItem
GeneralLayout.Outlet = GeneralLayoutOutlet
GeneralLayout.Body = GeneralLayoutBody

export default GeneralLayout