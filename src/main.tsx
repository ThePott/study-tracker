import InstructorReviewAssignmentPage from '@/src/pages/instructor/InstructorReviewCheckPage.js'
import InstructorProgressPage from '@/src/pages/instructor/InstructorSummaryPage.js'
import Workbench from '@/src/pages/workbench/Workbench.js'
import { Skeleton, ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { getStudentArray } from '@/src/shared/services/axiosUtils.js'
import App from './App.jsx'
import './index.css'
import InstructorLayout from './layouts/instructor/InstructorLayout.js'
import StudentLayout from './layouts/student/StudentLayout.js'
import InstructorManagePage from './pages/instructor/InstructorManagePage.js'
import RealInstructorProgressPage from './pages/instructor/RealInstructorProgressPage.js'
import StdProgressPage from './pages/student/StudentProgressPage.js'
import StdReviewCheckPage from './pages/student/StudentReviewPage.js'
import StdSummary from './pages/student/summary/page.js'
import theme from './theme.js'

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
        element: <InstructorProgressPage />
      },
      {
        path: "progress",
        element: <RealInstructorProgressPage />
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
