import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginFB } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

const SuccessFBScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loginFB());
    // const handleBeforeUnload = () => {
    //   window.opener.postMessage("reload", window.location.origin);
    // };

    // window.addEventListener("beforeunload", handleBeforeUnload);

    const timer = setTimeout(() => {
      window.close();
      navigate("/");
    }, 1000);
    return () => {
      clearTimeout(timer);

      // window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h2>Login Successful!</h2>
      <p>You are now logged in.</p>
    </div>
  );
};

export default SuccessFBScreen;
