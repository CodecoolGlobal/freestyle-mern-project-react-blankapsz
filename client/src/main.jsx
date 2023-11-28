import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Edit from '../pages/Edit.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/edit",
    element: <Edit />
  }

  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
