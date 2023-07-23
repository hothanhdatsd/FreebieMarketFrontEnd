import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginGoogle } from "../actions/userActions";

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
  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h2>Login Successful!</h2>
      <p>You are now logged in.</p>
    </div>
  );
};

export default SuccessGoogleScreen;
