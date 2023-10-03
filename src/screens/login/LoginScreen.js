import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { login } from "../../actions/userActions";
import logo from "../../images/logo.png";
import bgimage from "../../images/bgimage.jpg";
const LoginScreen = ({ location }) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  let exam = useLocation().search;
  let navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast("🦄 Password or Username invalid!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [error]);

  const loginGoogle = async () => {
    const googleURL = "http://localhost:5000/auth/google";
    // const googleURL = "https://freebiemarketbe.onrender.com/auth/google";
    const width = 500; // Desired width of the popup window
    const height = 600; // Desired height of the popup window

    // Calculate the position to center the popup on the screen
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // Open the popup window with centered position
    window.open(
      googleURL,
      "_parent",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };
  const loginFacebook = async () => {
    const googleURL = "http://localhost:5000/auth/facebook";
    const width = 500; // Desired width of the popup window
    const height = 600; // Desired height of the popup window

    // Calculate the position to center the popup on the screen
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // Open the popup window with centered position
    window.open(
      googleURL,
      "_parent",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };
  const redirect = exam ? exam.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [dispatch, userInfo, redirect, navigate]);

  return (
    <div className="container">
      <img className="food-img" src={bgimage} alt="" />
      <div className="container-item">
        {" "}
        <div className="contain">
          <img src={logo} alt="" className="food-logo" />
          <div className="header">
            <h5 className="header-title w800">Create an Account</h5>
            <p className="header-title">Sign Up</p>
          </div>
        </div>
        <div className="contain-mid">
          <form onSubmit={submitHandler}>
            <div className="contain-mid-item" id="userName">
              <h5 className="contain-title">Email Address</h5>
              <input
                className="input-email"
                type="text"
                placeholder="Enter username"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>
            <div className="contain-mid-item" id="password">
              <h5 className="contain-title">Password</h5>
              <input
                className="input-email"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="contain-checkbox">
              <input type="checkbox" />
              <p className="text fz18">Remember my prefence</p>
            </div>
            <button className="button" type="submit">
              Sign Me In
            </button>
          </form>
        </div>
        <ToastContainer />
        <div className="container-bottom">
          <p className="text">Continue With</p>
          <div className="mb-3 contain-bottom">
            <FacebookLoginButton onClick={loginFacebook} />
            <GoogleLoginButton buttonText="Login" onClick={loginGoogle} />
          </div>
        </div>
        <div className="register text">
          <span>Don't have an account? </span>
          <NavLink className={"signup"} to={"/register"}>
            Sign up
          </NavLink>
          <div className="register">
            <NavLink to={"/rspassword"}>Forgot password</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
