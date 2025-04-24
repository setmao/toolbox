import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from '@/Router'
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: import.meta.env.VITE_GTM_ID,
}

TagManager.initialize(tagManagerArgs)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
