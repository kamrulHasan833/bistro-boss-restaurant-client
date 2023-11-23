import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import AddItem from "../Components/Sections/AddItem";
import Allusers from "../Components/Sections/Allusers";
import HomeDashboard from "../Components/Sections/HomeDashboard";
import ManageItems from "../Components/Sections/ManageItems";
import MyCart from "../Components/Sections/MyCart";
import PaymentGetway from "../Components/Sections/PaymentGetway";
import PaymentHistory from "../Components/Sections/PaymentHistory";
import UpdateItem from "../Components/Sections/UpdateItem";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import OurMenu from "../Pages/OurMenu";
import OurShop from "../Pages/OurShop";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/our-menu",
        element: <OurMenu />,
      },
      {
        path: "/our-shop",
        element: <OurShop />,
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),

    children: [
      // user route
      { path: "my-cart", element: <MyCart /> },
      { path: "payment-getway", element: <PaymentGetway /> },
      { path: "payment-history", element: <PaymentHistory /> },

      // admin routes
      {
        index: true,
        element: <HomeDashboard />,
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <Allusers />
          </AdminRoute>
        ),
      },
      {
        path: "add-item",
        element: (
          <AdminRoute>
            <AddItem />
          </AdminRoute>
        ),
      },
      {
        path: "manage-items",
        element: (
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        ),
      },
      {
        path: "update-item/:id",
        element: (
          <AdminRoute>
            <UpdateItem />
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;
