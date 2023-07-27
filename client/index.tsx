import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import routes from './routes'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <RouterProvider router={routes} />,
  )
})
