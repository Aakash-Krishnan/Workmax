import ReactDOM from "react-dom/client";
import { router } from "./Routes/index.jsx";
import "./main.scss";
import { RouterProvider } from "react-router-dom";
import store from "./App/store.jsx";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
