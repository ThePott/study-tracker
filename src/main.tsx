/** DO NOT LAZY Workbench */
import Workbench from '@/src/pages/workbench/Workbench.js'
import { ThemeProvider } from '@mui/material'
import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AppLayout from './features/layouts/AppLayout'
import './index.css'
import theme from './theme.js'

const MainPage = lazy(() => import('./pages/MainPage'))
const ManagePage = lazy(() => import('./pages/ManagePage'))
const ProgressPage = lazy(() => import('./pages/ProgressPage'))
const ReviewCheckPage = lazy(() => import('./pages/ReviewCheckPage'))
const SummaryPage = lazy(() => import('./pages/SummaryPage'))

/** loader: getStudentArray, <<< 이거 대신할 거 채워 넣어야 함 */
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Suspense>
        <MainPage />
      </Suspense>
  },
  {
    element:
      <AppLayout />,
    children: [
      {
        path: "/manage",
        element:
          <Suspense>
            <ManagePage />
          </Suspense>
      },
      {
        path: "/summary",
        element:
          <Suspense>
            <SummaryPage />
          </Suspense>
      },
      {
        path: "/progress",
        element:
          <Suspense>
            <ProgressPage />
          </Suspense>
      },
      {
        path: "/review-check",
        element:
          <Suspense>
            <ReviewCheckPage />
          </Suspense>
      },
    ]
  },
  /** DO NOT SUSPENSE IT */
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
