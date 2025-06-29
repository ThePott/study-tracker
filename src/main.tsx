import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import InstPreparePage from '../pages/instructor/prepare/page.js'
import InstInClass from '../pages/instructor/in-class/page.js'
import InstAtTheEnd from '../pages/instructor/at-the-end/page.js'
import StdSummary from '../pages/student/summary/page.js'
import StdProgressPage from '../pages/student/progress/page.js'
import StdReviewCheckPage from '../pages/student/review-check/page.js'
import StudentLayout from './layouts/student/StudentLayout.js'

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
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
