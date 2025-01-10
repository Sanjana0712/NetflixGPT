import React from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import MoviePlay from './MoviePlay'


const Body = () => {

    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
         {
            path:"/",
            element:<Login/>,
         },
         {
            path:"/browse",
            element:<Browse/>,
         },
         {
          path: "/movie/:id",
          element: <MoviePlay />,
        },
    ])


  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body