import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/home/home.jsx'
import Layout from './Layout.jsx'
import About from './components/about/about.jsx'
import Contact from './components/contact/contact.jsx'

const router = createBrowserRouter([
  { 
    //it's the main route serving at "/" and the children components are passed as/in outlets
    path : '/',
    element : <Layout/>,
    children : [
      {
        path : "",
        element : <Home/>
      },
      {
        path : "about",
        element : <About/>
      },
      {
        path : "contact",
        element : <Contact/>
      }
    ]
  }
])

/* easier way to define routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}> 
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='user/:userid' element={<User />} />
      <Route 
      loader={githubInfoLoader}
      path='github' 
      element={<Github />}
       />
    </Route>
  )
)
  */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
