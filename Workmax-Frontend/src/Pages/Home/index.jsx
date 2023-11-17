/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout/index";
import {
  selectUserDetails,
  setUserLoginDetails,
} from "../../App/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import Loader from "../../Components/Loader/Loader";
import { getCurrentUser } from "../../App/Api/FirestoreApi";

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [loading, setLoading] = useState(true);

  // console.log("currentUser", currentUser);

  const userDetails = useSelector(selectUserDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useMemo(() => {
    getCurrentUser(dispatch);
  }, []);

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

  return <div>{loading ? <Loader /> : <HomeLayout />};</div>;
};

export default Home;
