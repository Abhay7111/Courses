// Packages
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// CSS
import './index.css';
import './Css/Fonts.css'

// Components
import Landing_Page from './Pages/Landing.Page';
import Root_Chunks from './Components/Dashboard/Chunks.Dashboard/Root.Chunks';
import Home_Pages from './Components/Dashboard/Pages.Dashboard/Home.Pages';

// ------------------- * # * ------------------- //

const Routes = () => {
  const routes = createBrowserRouter ([
    {path:'/', element:<Landing_Page/>},
    {path:'Dashboard', element:<Root_Chunks/>, children:[
      {path:'', element:<Home_Pages/>},
    ]}
  ])

  return (
    <StrictMode>
      <RouterProvider router={routes}/>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Routes />)
