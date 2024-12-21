import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Marathons from "../pages/Marathons";
import Dashboard from "../pages/Dashboard";


const Router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout></Mainlayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/marathon',
          element:<Marathons></Marathons>
        },
        {
          path: '/dashboard',
          element: <Dashboard></Dashboard>
        },
        {
            path: 'register',
            element: <Register></Register>
        },
        {
            path:'login',
            element: <Login></Login>
        }

      ]
    },
  ]);
  export default Router;