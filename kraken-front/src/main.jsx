import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { page } from './App.jsx'
import { Provider } from "./components/ui/provider.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={page} />
    </Provider>
  </StrictMode>,
)
