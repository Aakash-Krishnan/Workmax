import { createBrowserRouter } from "react-router-dom";
import LoginComponent from "../Components/LoginComponent";
import RegisterComponent from "../Components/RegisterComponent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginComponent />,
  },
  {
    path: "/register",
    element: <RegisterComponent />,
  },
]);
