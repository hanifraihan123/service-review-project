import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { AuthContext } from './Components/Provider/AuthProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthContext.Provider>
        <RouterProvider router={router} />
     </AuthContext.Provider>
  </StrictMode>,
)
