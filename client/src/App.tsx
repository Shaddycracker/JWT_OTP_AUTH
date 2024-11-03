import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  

 
} from "react-router-dom";
import CombineLoginRegister from "./components/RegisterLogin/CombineLoginRegister";
import MainLayout from "./components/Layouts/MainLayout";
import ProtectedRoute from "./components/Extra/ProtectedRoute";
import UnprotectedRoute from "./components/Extra/UnprotectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import LandingPage from "./components/Extra/LandingPage";
function App() {
   
   
   const router= createBrowserRouter([
    { 
      path:'/',
      element:(<UnprotectedRoute><LandingPage/></UnprotectedRoute>),

     },
    {
      path:'/',
      element: (<ProtectedRoute><MainLayout/></ProtectedRoute>),
      children:[
             { 
              path:'profile',
              element:(<ProtectedRoute><Dashboard/></ProtectedRoute>),

             },{
              path:'create',
              element:(<ProtectedRoute><div> create </div></ProtectedRoute>),
             },{
              path:'update',
              element:(<ProtectedRoute><div> update </div></ProtectedRoute>),
             },
             {
              path:'delete',
              element:(<ProtectedRoute><div> Delete </div></ProtectedRoute>),

             }
                
           
        ],
      
    },
    {
      path: "auth",
      element:(<Outlet/>),
      children:[
          {
            path:"",
            element:(<h2> Page not found </h2>)

          },
         {
          path:"login",
          element:(<UnprotectedRoute><CombineLoginRegister LoginType="login"/></UnprotectedRoute>)
         },
         {
          path:"register",
          element:(<UnprotectedRoute><CombineLoginRegister LoginType="register"/></UnprotectedRoute>)
         }

      ]

    }
   ])
  

  return (
    <>

      <RouterProvider router={router}/>
      
      
      
    </>
  )
}

export default App
