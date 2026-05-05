import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App.jsx';
import Signup from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login.jsx";
import Posts from "./pages/posts/Posts.jsx";
import About from "./pages/about/About.jsx";
import "./index.css";

const router = createBrowserRouter([{
  path : "/",
  element : <App/>,
  children : [
    {
      element : <Posts/>,
      index : true
    },
    {
      path : "signup",
      element : <Signup/>
    },
    {
      path : "login",
      element : <Login/>
    },
    {
      path : "posts",
      element : <Posts/>
    },
    {
      path : "about",
      element : <About/>
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
