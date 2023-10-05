import ReactDOM from "react-dom/client";
import { router } from "./Routes/index.jsx";
import "./main.scss";
import { RouterProvider } from "react-router-dom";
import store from "./App/store.jsx";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
