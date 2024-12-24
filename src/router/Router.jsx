import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Marathons from "../pages/Marathons";
import Dashboard from "../pages/Dashboard";
import Notfound from "../components/Notfound";
import AddMara from "../pages/AddMara";
import MyList from "../pages/MyList";
import Details from "../pages/Details";
import Apply from "../pages/Apply";
import PrivateRoute from "./PrivateRoute";
import MarathonRegister from "../pages/MarathonRegister";


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
          element:<PrivateRoute><Marathons></Marathons></PrivateRoute>
        },
        {
          path: '/dashboard',
          element: <Dashboard></Dashboard>,
          children:[
            
          ]
        },
        {
          path:'/dashboard/addmara',
          element:<PrivateRoute><AddMara></AddMara></PrivateRoute>
        },
        {
          path:'/dashboard/my-list',
          element:<MyList></MyList>
        },
        {
          path:'/dashboard/apply-list',
          element:<Apply></Apply>
        },
        {
            path: 'register',
            element: <Register></Register>
        },
        {
            path:'login',
            element: <Login></Login>
        },
        {
          path:"/marathons/:id",
           element:<PrivateRoute><Details></Details></PrivateRoute>
        },
        {
          path: "/marathonapply/:id",
          element:<MarathonRegister></MarathonRegister>
        }
        

        
      ]
    },

    {
      path: "*",
      element:<Notfound></Notfound>
    },

  ]);
  export default Router;