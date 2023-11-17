import "./index.scss";
import { Button } from "antd";
import { GooglePlusOutlined } from "@ant-design/icons";
import { GoogleSignInAPI } from "../../App/Api/AuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLoginDetails } from "../../App/User/userSlice";
import getUniqueId from "../../Helper/getUniqueId";
import { postUserData } from "../../App/Api/FirestoreApi";

const LoginComponent = () => {
  const uniqueId = crypto.randomUUID();
  // const object = {
  //   taskId: uniqueId,
  //   userId: "",
  //   title: "",
  //   task: "",
  //   break: 0,
  //   workTime: {
  //     hours: 0,
  //     minutes: 0,
  //     total: 0,
  //   },
  //   tabs: "Works",
  // };
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleAuth = () => {
    GoogleSignInAPI().then(
      (res) => {
        setUser(res.user);
        postUserData(
          {
            userID: uniqueId,
            name: res.user.displayName,
            email: res.user.email,
          }
          // object
        );
        toast.success("Signed In to linkedIn with google");
        localStorage.setItem("userEmail", res.user.email);
        navigate("/home");
      },
      () => toast.error("Please check your credentials")
    );
  };

  const setUser = (result) => {
    dispatch(setUserLoginDetails(result));
  };
  return (
    <div className="login-wrapper">
      <div className="login-wrapper-inner">
        <h1>Sign-in</h1>
        {/* <label htmlFor="email">Email</label>
        <input
          className="login-input"
          name="email"
          type="email"
          placeholder="Email"
        />

        <label htmlFor="password">Password</label>
        <input
          className="login-input"
          name="password"
          type="password"
          placeholder="Password"
        />
        <Button type="primary">Primary Button</Button> */}
        <Button
          type="primary"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleAuth}
        >
          <GooglePlusOutlined style={{ fontSize: "20px" }} />
          Google-signin
        </Button>
      </div>
    </div>
  );
};

export default LoginComponent;
