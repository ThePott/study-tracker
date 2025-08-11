import Workbench from '@/src/pages/workbench/Workbench.js'
import { ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AppLayout from './features/layouts/AppLayout'
import './index.css'
import MainPage from './pages/MainPage'
import ManagePage from './pages/ManagePage'
import ProgressPage from './pages/ProgressPage'
import ReviewCheckPage from './pages/ReviewCheckPage'
import SummaryPage from './pages/SummaryPage'
import theme from './theme.js'

/** loader: getStudentArray, <<< 이거 대신할 거 채워 넣어야 함 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/manage",
        element: <ManagePage/>
      },
      {
        path: "/summary",
        element: <SummaryPage />
      },
      {
        path: "/progress",
        element: <ProgressPage />
      },
      {
        path: "/review-check",
        element: <ReviewCheckPage />
      },
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
