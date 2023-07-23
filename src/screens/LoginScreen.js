import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { login } from "../actions/userActions";
const LoginScreen = ({ location }) => {
  const [userName, setUserName] = useState(" ");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  let exam = useLocation().search;
  let navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(userName, password));
  };
  const loginGoogle = async () => {
    const googleURL = "http://localhost:5000/auth/google";
    const width = 500; // Desired width of the popup window
    const height = 600; // Desired height of the popup window

    // Calculate the position to center the popup on the screen
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // Open the popup window with centered position
    window.open(
      googleURL,
      "_blank",
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
      "_blank",
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
    <FormContainer>
      <h1>Đăng nhập</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="userName">
          <Form.Label>Tên tài khoản</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button style={{ marginTop: 10 }} type="submit" variant="primary">
          Đăng nhập
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          <FacebookLoginButton onClick={loginFacebook} />
        </Col>
        <Col>
          <GoogleLoginButton buttonText="Login" onClick={loginGoogle} />
        </Col>
      </Row>{" "}
      <Row className="py-3">
        <Col>
          Chưa có tài khoản?{" "}
          <Link
            style={{ color: "#000" }}
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            Đăng ký
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
