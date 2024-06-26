import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Edit from '../pages/Edit.jsx';
import Books from '../pages/Collection.jsx';
import Home from '../pages/Home.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/edit",
        element: <Edit />
      },
      {
        path: '/collection',
        element: <Books />
      },
      {
        path: '/',
        element: <Home />
      },
    ]
  },

  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)