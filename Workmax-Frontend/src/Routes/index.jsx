import { createBrowserRouter } from "react-router-dom";
import RegisterComponent from "../Components/RegisterComponent";
import HomeLayout from "../Layouts/HomeLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/register",
    element: <RegisterComponent />,
  },
]);
