import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Auth0Provider } from '@auth0/auth0-react'

import routes from './routes'

// TODO: replace deprecated redirectUri
document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="dev-kelly.au.auth0.com"
      clientId="f5HswUt5Q5lpGBLzgPQRtK6LLD8rpSvx"
      redirectUri={window.location.origin}
      audience="https://magic-awaaaay/api"
    >
      <RouterProvider router={routes} />
    </Auth0Provider>,
  )
})
