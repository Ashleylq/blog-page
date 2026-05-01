import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App.jsx';
import Signup from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login.jsx"
import "./index.css";

const router = createBrowserRouter([{
  path : "/",
  element : <App/>,
  children : [
    {
      path : "signup",
      element : <Signup/>
    },
    {
      path : "login",
      element : <Login/>
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
