import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import StdProgressPage from './pages/student/progress/page.js'
import StdReviewCheckPage from './pages/student/review-check/page.js'
import StdSummary from './pages/student/summary/page.js'
import App from './App.jsx'
import './index.css'
import StudentLayout from './layouts/student/StudentLayout.js'
import { ThemeProvider } from '@mui/material'
import theme from './theme.js'
import Workbench from '@/src/pages/workbench/Workbench.js'
import InstructorLayout from './layouts/instructor/InstructorLayout.js'
import InstructorSummaryPage from '@/src/pages/instructor/summary/InstructorSummaryPage.js'
import InstructorProgressPage from '@/src/pages/instructor/progress/InstructorProgressPage.js'
import InstructorReviewAssignmentPage from '@/src/pages/instructor/review-assignment/page.js'
import { getStudentArray } from './_utils/axiosUtils.js'
import InstructorManagePage from './pages/instructor/manage/InstructorManagePage.js'
import { Skeleton } from '@mui/material'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/instructor",
    element: <InstructorLayout />,
    loader: getStudentArray,
    hydrateFallbackElement: <Skeleton />,
    children: [
      {
        path: "manage",
        element: <InstructorManagePage />
      },
      {
        path: "summary",
        element: <InstructorSummaryPage />
      },
      {
        path: "progress",
        element: <InstructorProgressPage />
      },
      {
        path: "review-assignment",
        element: <InstructorReviewAssignmentPage />
      },
    ]
  },
  {
    path: "/student",
    element: <StudentLayout />,
    children: [
      {
        path: "summary",
        element: <StdSummary />
      },
      {
        path: "progress",
        element: <StdProgressPage />
      },
      {
        path: "review-check",
        element: <StdReviewCheckPage />
      }
    ]
  },
  {
    path: "/workbench",
    element: <Workbench />
  }
]);

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
)
