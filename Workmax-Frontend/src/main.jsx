import ReactDOM from "react-dom/client";
// import { router } from "./Routes/index.jsx";
import "./main.scss";
// import { RouterProvider } from "react-router-dom";
import store from "./App/store.jsx";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/index.jsx";
import Home from "./Pages/Home/index.jsx";
// import Test from "./Test.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  </Provider>
);
