import React from 'react'
import Home from './Employee/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import View from './Employee/View'
import Update from './Employee/Update'
import PageNotFound from './Employee/PageNotFound'

const App = () => {
  let route = createBrowserRouter([
    {
      path:'/',element:<Home/>
    },
    {
      path:'/view/:id',element:<View/>
    },
    {
      path:'/update/:id',element:<Update/>
    },
    {
      path:'*',element:<PageNotFound/>
    }
  ])
  return (
    <RouterProvider router={route}/>
  )
}

export default App