/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import HomeComponent from "../../Components/HomeComponent";
import {
  selectUserDetails,
  setUserLoginDetails,
} from "../../App/User/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Loader from "../../Components/Loader/Loader";

const HomeLayout = () => {
  const [loading, setLoading] = useState(true);

  const userDetails = useSelector(selectUserDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      dispatch(setUserLoginDetails(res));
      if (!userDetails?.user?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, [userDetails]);

  return <div>{loading ? <Loader /> : <HomeComponent />};</div>;
};

export default HomeLayout;