import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginFB } from "../actions/userActions";

const SuccessFBScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginFB());
    const handleBeforeUnload = () => {
      window.opener.postMessage("reload", window.location.origin);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const timer = setTimeout(() => {
      window.close();
    }, 3000);
    return () => {
      clearTimeout(timer);

      window.removeEventListener("beforeunload", handleBeforeUnload);
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
