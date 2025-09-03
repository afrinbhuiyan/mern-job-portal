import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Seller from "../pages/Seller";
import AllJobs from "../pages/AllJobs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "seller",
        Component: Seller
      },
      {
        path: "/all-jobs",
        Component: AllJobs
      }
    ],
  },
  {
    path: "*",
    Component: NotFound,
  }
]);
