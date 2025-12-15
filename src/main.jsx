// Packages
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// CSS
import './index.css';
import './Css/Fonts.css'
import './Css/Markdown.css'

// Components
import Landing_Page from './Pages/Landing.Page';
import Root_Chunks from './Components/Dashboard/Chunks.Dashboard/Root.Chunks';
import Home_Pages from './Components/Dashboard/Pages.Dashboard/Home.Pages';
import Home_Chunk from './Components/Dashboard/Chunks.Dashboard/Home.Chunk';
import Course_Chunk from './Components/Chunks/Course.Chunk';
import Chapters_Chunk from './Components/Chunks/Chapters.Chunk';

// ------------------- * # * ------------------- //

const Routes = () => {
  const routes = createBrowserRouter ([
    {path:'/', element:<Landing_Page/>},
    {path:'Dashboard', element:<Root_Chunks/>, children:[
      {path:'', element:<Home_Pages/>, children:[
        {path:'', element:<Home_Chunk/>},
        {path:'course',  children:[
          {path:'', element:<div className='text-white p-4'>Please select a course to view details.</div>},
          {path:':courseId', children:[
            {path:'' , element:<Course_Chunk/>},
            {path:':chapterId', element:<Chapters_Chunk/>}
          ]}
        ]}
      ]},
    ]}
  ])

  return (
    <StrictMode>
      <RouterProvider router={routes}/>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Routes />)
