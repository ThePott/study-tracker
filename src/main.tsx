import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import StdProgressPage from '../pages/student/progress/page.js'
import StdReviewCheckPage from '../pages/student/review-check/page.js'
import StdSummary from '../pages/student/summary/page.js'
import App from './App.jsx'
import './index.css'
import StudentLayout from './layouts/student/StudentLayout.js'
import { ThemeProvider } from '@mui/material'
import theme from './theme.js'
import Workbench from '@/pages/workbench/Workbench.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
