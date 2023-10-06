/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout/index";
import {
  selectUserDetails,
  setUserLoginDetails,
} from "../../App/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Loader from "../../Components/Loader/Loader";

const Home = () => {
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

  return <div>{loading ? <Loader /> : <HomeLayout />};</div>;
};

export default Home;
