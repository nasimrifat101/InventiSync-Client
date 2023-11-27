import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/ErrorPages/NotFound";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import Dashboard from "../Layout/Dashboard/Dashboard";
import CreateShop from "../Pages/CreateShop/CreateShop";
import PrivateRoute from "./PrivateRoute";
import ManageShops from "../Pages/Dashboard/Admin/ManageShops";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AdminRoute from "./AdminRoute";
import MyStore from "../Pages/Dashboard/Manager/MyStore";
import MyProducts from "../Pages/Dashboard/Manager/MyProducts";
import AddProducts from "../Pages/Dashboard/extra/AddProducts";
import SalesCollection from "../Pages/Dashboard/Manager/SalesCollection";
import CheckOut from "../Pages/Dashboard/Manager/CheckOut";
import PaymentSubscribsion from "../Pages/Dashboard/Manager/PaymentSubscribsion";
import SalesSummury from "../Pages/Dashboard/Manager/SalesSummury";
import AdminAllProducts from "../Pages/Dashboard/Admin/AdminAllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/CreateShop",
        element: (
          <PrivateRoute>
            <CreateShop></CreateShop>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myproducts/addproducts",
        element: (
          <PrivateRoute>
            <AddProducts></AddProducts>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "manageShops",
        element: (
          <AdminRoute>
            <ManageShops></ManageShops>
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            {" "}
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "mystore",
        element: <MyStore></MyStore>,
      },
      {
        path: "myproducts",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "salescollection",
        element: <SalesCollection></SalesCollection>,
      },
      {
        path: "checkout",
        element: <CheckOut></CheckOut>,
      },
      {
        path: 'payment',
        element: <PaymentSubscribsion></PaymentSubscribsion>
      },
      {
        path: 'summary',
        element: <SalesSummury></SalesSummury>
      },
      {
        path: 'allproducts',
        element: <AdminRoute><AdminAllProducts></AdminAllProducts></AdminRoute>
      }
    ],
  },
]);

export default router;
