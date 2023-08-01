import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginGoogle } from "../actions/userActions";
import axios from "axios";
const SuccessGoogleScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginGoogle());
    const handleBeforeUnload = () => {
      window.opener.postMessage("reload", window.location.origin);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const timer = setTimeout(() => {
      window.close();
    }, 2000);
    return () => {
      clearTimeout(timer);

      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);
  // const [user, setUser] = useState(null);

  // const getUser = async () => {
  //   try {
  //     const url = `${process.env.REACT_APP_URL_API}/auth/successGG`;
  //     const { data } = await axios.get(url, { withCredentials: true });
  //     console.log(data);
  //     setUser(data.user._json);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h2>Login Successful!</h2>
      <p>You are now logged in.</p>
    </div>
  );
};

export default SuccessGoogleScreen;
