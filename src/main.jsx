import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './Css/Fonts.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing_Page from './Pages/Landing.Page';

const App = () => {

  const routes = createBrowserRouter ([
    {path:'/', element:<Landing_Page/>},
  ])

  return (
    <StrictMode>
      <RouterProvider router={routes}/>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<App />)
