import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Single from "./pages/Single";
import Single2 from "./pages/Single2";
import Register from "./pages/Register"
import Login from "./pages/Login";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Create2 from "./pages/Create2";
import Busket from "./pages/Busket";
// import CreateStaff from "./pages/CreateStaff";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
// import NavbarStaff from "./components/NavbarStaff"
import Footer from "./components/Footer";
// import Staff from "./pages/Staff";
import "./style.scss";
import Home2 from "./pages/Home2";
const Layot = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
const Layot2 = () => {
  return (
    <>
      <Navbar2 />
      <Outlet />
      <Footer />
    </>
  );
};
// const LayotStaff = () => {
//   return (
//     <>
//       <NavbarStaff/>
//       <Outlet />
//       <Footer />
//     </>
//   );
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layot/>,
    children: [
      {
        path: "/",
        element:<Home/>,
    },
  {
    path: "/post/:id",
    element: <Single/>,
  },
  {
    path: "/create",
    element: <Create/>,
  },
  {
    path: "/busket",
    element: <Busket/>,
  },
  
    
]
  },
  {
    path: "/",
    element: <Layot2/>,
    children: [
      {
        path: "/posts2",
        element: <Home2/>,
    },
  {
    path: "/post2/:id",
    element: <Single2/>,
  },
  {
    path: "/create2",
    element: <Create2/>,
  },
  
]
  },
  // {
  //   path: "/",
  //   element: <LayotStaff/>,
  //   children: [
  //     {
  //       path: "/staff",
  //       element: <Staff/>,
  //   },{
  //     path: "/staff/:id",
  //     element: <SingleStaff/>,
  //   },
  //   {
  //     path: "/createstaff",
  //     element: <CreateStaff/>,
  //   },
  // ]
  // },
{
  path: "/register",
    element: <Register/>,
  },
{
  path: "/login",
    element: <Login/>,
  },
  
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}


export default App;