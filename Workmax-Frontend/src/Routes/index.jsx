import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout/index";
import LoginLayout from "../Layouts/LoginLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
  },
]);
