import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import App from './App.tsx'
import Answers from './components/answers.tsx';
import './index.css'

const router=createBrowserRouter([
  {
  path:'/',
  element:<App/>,
  },
  {
    path:'/answers',
    element:<Answers/>
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
