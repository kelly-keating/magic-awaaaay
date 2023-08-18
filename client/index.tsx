import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Auth0Provider } from '@auth0/auth0-react'
import { ChakraProvider } from '@chakra-ui/react'

import routes from './routes'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="dev-kelly.au.auth0.com"
      clientId="f5HswUt5Q5lpGBLzgPQRtK6LLD8rpSvx"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://magic-awaaaay/api",
        scope: 'openid profile email offline_access'
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <ChakraProvider>
        <RouterProvider router={routes} />
      </ChakraProvider>
    </Auth0Provider>,
  )
})
