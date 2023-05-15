import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import App from './App.tsx'
import Answers from './components/answers/index.tsx';
import './index.css'
import { createTheme,ThemeProvider } from '@mui/material';

const theme=createTheme({
  typography:{
    fontFamily:'Ubuntu'
  },
})

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
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
