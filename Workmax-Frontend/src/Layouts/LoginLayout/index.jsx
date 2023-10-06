/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserDetails,
  setUserLoginDetails,
} from "../../App/User/userSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import LoginComponent from "../../Components/LoginComponent";

const LoginLayout = () => {
  const [loading, setLoading] = useState(true);

  const userDetails = useSelector(selectUserDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      dispatch(setUserLoginDetails(res));
      if (userDetails?.user?.accessToken) {
        navigate("/home");
      } else {
        setLoading(false);
      }
    });
  }, [userDetails]);

  return <div>{loading ? <Loader /> : <LoginComponent />}</div>;
};

export default LoginLayout;
