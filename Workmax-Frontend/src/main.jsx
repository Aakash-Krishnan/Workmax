import ReactDOM from "react-dom/client";
import { router } from "./Routes/index.jsx";
import "./main.scss";
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {},
  middleware: [saga],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
