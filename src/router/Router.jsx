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
          element: <Dashboard></Dashboard>,
          children:[
            {
              path:'/dashboard/addmara',
              element:<AddMara></AddMara>
            },
            {
              path:'/dashboard/my-list',
              element:<MyList></MyList>
            },
            {
              path:'/dashboard/apply-list',
              element:<MyList></MyList>
            }
          ]
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
           element:<Details></Details>
        }
        

        
      ]
    },

    {
      path: "*",
      element:<Notfound></Notfound>
    },

  ]);
  export default Router;